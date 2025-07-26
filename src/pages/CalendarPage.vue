<template>
  <div>
    <h2 class="text-xl font-bold mb-4">カレンダー</h2>

    <CalendarHeatMap :data="dailyTotals" :year="currentYear" :month="currentMonth" />

    <!-- 日付ごとの取引リスト -->
    <div class="mt-8 max-w-3xl mx-auto">
      <h3 class="text-lg font-semibold mb-3">直近の取引一覧</h3>

      <n-list bordered>
        <template v-for="(txs, date) in groupedTransactions" :key="date">
          <n-list-item-group :title="date">
            <n-list-item
              v-for="tx in txs"
              :key="tx.id"
              class="cursor-pointer flex justify-between items-center hover:bg-gray-100"
              @click="openEditModal(tx)"
            >
              <div>
                <div class="font-semibold">{{ tx.memo || 'メモなし' }}</div>
                <div class="text-sm text-gray-600">
                  カテゴリ: {{ tx.categoryName }} | カード: {{ tx.cardName }}
                </div>
              </div>
              <div class="font-bold">¥{{ tx.amount }}</div>
            </n-list-item>
          </n-list-item-group>
        </template>
      </n-list>
    </div>

    <!-- 編集モーダルコンポーネント呼び出し -->
    <EditTransactionModal
      v-model:show="editModalVisible"
      :transaction="selectedTransaction"
      @saved="onEditSaved"
      @deleted="onEditDeleted"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CalendarHeatMap from '../components/CalendarHeatMap.vue'
import { useTransactionStore } from '../stores/transactionStore'
import { useCategoryStore } from '../stores/categoryStore'
import { useCardStore } from '../stores/cardStore'
import { NList, NListItem, NListItemGroup } from 'naive-ui'
import EditTransactionModal from '../components/EditTransactionModal.vue'

const transactionStore = useTransactionStore()
const categoryStore = useCategoryStore()
const cardStore = useCardStore()

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()

const groupedTransactions = computed(() => {
  const map: Record<string, any[]> = {}

  for (const tx of transactionStore.transactions) {
    const dateKey = tx.date.split('T')[0]
    if (!map[dateKey]) map[dateKey] = []
    const cat = categoryStore.categories.find(c => c.id === tx.categoryId)
    const card = cardStore.cards.find(c => c.id === tx.cardId)
    map[dateKey].push({
      ...tx,
      categoryName: cat?.name || '',
      cardName: card?.name || ''
    })
  }

  return Object.fromEntries(
    Object.entries(map).sort((a, b) => (a[0] < b[0] ? 1 : -1))
  )
})

const dailyTotals = computed(() => {
  const map: Record<string, number> = {}

  for (const tx of transactionStore.transactions) {
    const date = new Date(tx.date)
    const key = date.toISOString().split('T')[0]
    map[key] = (map[key] || 0) + tx.amount
  }

  return map
})

// モーダル表示制御・選択中取引
const editModalVisible = ref(false)
const selectedTransaction = ref(null)

function openEditModal(tx: any) {
  selectedTransaction.value = tx
  editModalVisible.value = true
}

function onEditSaved(updatedTx: any) {
  // 必要ならstore更新や画面再描画の対応
  editModalVisible.value = false
}

function onEditDeleted(deletedId: string) {
  // 必要ならstore更新や画面再描画の対応
  editModalVisible.value = false
}
</script>
