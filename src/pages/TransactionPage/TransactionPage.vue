<template>
  <PageCard title="手入力で支出を追加" subtitle="現金/カードの支出登録">
    <TransactionForm
      v-model="form"
      :category-options="categoryOptions"
      :card-options="cardOptions"
      @submit="onSubmit"
    />
  </PageCard>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue'
import PageCard from '../../shared/layout/PageCard.vue'
import TransactionForm from '../../features/TransactionComponents/TransactionForm.vue'

import { useTransactionStore } from '../../stores/transactionStore'
import { useCategoryStore } from '../../stores/categoryStore'
import { useCardStore } from '../../stores/cardStore'
import { TransactionCreate } from '../../types/Transaction'

type Ymd = string // "YYYY-MM-DD"

const transactionStore   = useTransactionStore()
const categoryStore  = useCategoryStore()
const cardStore = useCardStore()

// フォーム状態（TransactionForm に v-model で渡す）
const today = new Date().toISOString().split('T')[0] as Ymd
const form = reactive({
  date: today as Ymd | null,
  amount: null as number | null,
  memo: '',
  categoryId: null as string | null,
  cardId: null as string | null
})

onMounted(async () => {
  await Promise.all([categoryStore.loadCategories?.(), cardStore.loadCards?.()])
})

const cardOptions = computed(() =>
  cardStore.cards.map((card) => ({
    label: card.name,
    value: card.id
  }))
)

const categoryOptions = computed(() =>
  categoryStore.categories.map((cat) => ({
    label: cat.name,
    value: cat.id
  }))
)

function toCreate(): TransactionCreate {
  return {
    date: form.date as Ymd,
    amount: Number(form.amount ?? 0),
    memo: form.memo ?? '',
    cardId: form.cardId as string,
    categoryId: form.categoryId as string,
  }
}

async function onSubmit() {
  await transactionStore.addTransaction(toCreate())
  // 軽いリセット（今日の日付は残す）
  form.amount = null
  form.memo = ''
  form.categoryId = null
  form.cardId = null
}
</script>
