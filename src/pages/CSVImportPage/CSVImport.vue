<template>
  <PageCard title="PayPay CSV取り込み" subtitle="CSVを読み込み、重複を避けて登録します">
    <div class="space-y-4">
      <!-- 1) ファイル選択 -->
      <input type="file" accept=".csv" @change="onFile" />

      <!-- 2) 既定のカード/カテゴリ -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AppSelect v-model="defaultCardId" :options="cardOptions" label="カード" path="card" />
        <AppSelect v-model="defaultCategoryId" :options="categoryOptions" label="カテゴリ" path="category" />
      </div>

      <!-- 3) サマリ -->
      <n-alert type="info" v-if="preview.length" :bordered="false">
        読み込み: {{ preview.length }} 件
        <template v-if="duplicateCount > 0"> / 重複候補: {{ duplicateCount }} 件（除外）</template>
      </n-alert>

      <!-- 4) プレビュー -->
      <div v-if="preview.length">
        <CsvPreviewTable :rows="preview" />
        <div class="flex justify-end mt-4">
          <AsyncButton :onClick="register" :busy-text="'登録中…'">登録</AsyncButton>
        </div>
      </div>
      <EmptyState v-else>CSVファイルを選択してください</EmptyState>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { NAlert } from 'naive-ui'
import PageCard from '../../shared/layout/PageCard.vue'
import AppSelect from '../../shared/form/AppSelect.vue'
import AsyncButton from '../../shared/ui/AsyncButton.vue'
import EmptyState from '../../shared/ui/EmptyState.vue'

import CsvPreviewTable from '../../features/CSVImport/paypay/CsvPreviewTable.vue'
import { usePayPayCsvImport } from '../../features/CSVImport/paypay/usePayPayCsvImport'

import { useTransactionStore } from '../../stores/transactionStore'
import { useCardStore } from '../../stores/cardStore'
import { useCategoryStore } from '../../stores/categoryStore'

const tx = useTransactionStore()
const card = useCardStore()
const cat  = useCategoryStore()

onMounted(async () => {
  await Promise.all([tx.loadTransactions?.(), card.loadCards?.(), cat.loadCategories?.()])
})

const { preview, parseFile, makeKey } = usePayPayCsvImport()

// 既定のカード/カテゴリ（必須）
const defaultCardId = ref<number | null>(null)
const defaultCategoryId = ref<number | null>(null)

// options は number に統一（IDが文字列なら Number(...) で吸収）
const cardOptions = computed(() =>
  card.cards.map(c => ({ label: c.name, value: typeof c.id === 'string' ? Number(c.id) : c.id }))
)
const categoryOptions = computed(() =>
  cat.categories.map(c => ({ label: c.name, value: typeof c.id === 'string' ? Number(c.id) : c.id }))
)

// 既存トランザクションのキー集合（重複判定用）
const existingKeys = computed(() => {
  const set = new Set<string>()
  for (const t of tx.transactions) {
    // ここは **既存データの cardId 型** に合わせて Number/ String を揃える
    const cardId = typeof t.cardId === 'string' ? Number(t.cardId) : t.cardId
    set.add(`${t.date}|${t.amount}|${t.memo}|${cardId}`)
  }
  return set
})

// 重複候補数
const duplicateCount = computed(() => {
  if (defaultCardId.value == null) return 0
  let n = 0
  for (const r of preview.value) {
    const key = makeKey(r, defaultCardId.value)
    if (existingKeys.value.has(key)) n++
  }
  return n
})

async function onFile(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  await parseFile(file) // 既存の utils/parsePayPayCSV を使うならここで渡す
}

async function register() {
  if (defaultCardId.value == null || defaultCategoryId.value == null) return
  // 重複除外
  const rows = preview.value.filter(r => !existingKeys.value.has(makeKey(r, defaultCardId.value!)))

  // 1件ずつ作成（API側に一括登録があれば差し替え）
  await Promise.all(rows.map(r => tx.addTransaction({
    date: r.date,
    amount: r.amount,
    memo: r.memo,
    cardId: defaultCardId.value!,      // ← camelCase（serviceがsnakeに変換）
    categoryId: defaultCategoryId.value!
  })))

  // 完了
  preview.value = []
}
</script>