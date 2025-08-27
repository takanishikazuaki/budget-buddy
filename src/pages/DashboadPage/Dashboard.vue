<template>
  <div>
    <h2 class="text-xl font-bold mb-4">支出ダッシュボード</h2>

    <!-- Naive UI タブ -->
    <n-tabs
      type="line"
      v-model:value="activeTab"
      class="mb-6"
      animated
    >
      <n-tab name="month">月別</n-tab>
      <n-tab name="year">年別</n-tab>
    </n-tabs>

    <!-- 月別ダッシュボード -->
    <div v-if="isLoaded">
    <div v-if="activeTab === 'month'">
      <n-collapse accordion>
        <n-collapse-item title="月ごとの支出" name="1">
          <MonthlyBarChart :data="monthlyTotals" />
        </n-collapse-item>

        <n-collapse-item title="カテゴリーごとの支出" name="2">
          <CategoryPieChart :data="categoryTotals" />
        </n-collapse-item>

        <n-collapse-item title="曜日ごとの支出" name="3">
          <WeeklyBarChart :data="weeklyTotals" />
        </n-collapse-item>

        <n-collapse-item title="カード別支出割合（今月）" name="4">
          <CardPieChart :data="cardTotals" />
        </n-collapse-item>

        <n-collapse-item title="月別取引件数" name="6">
          <MonthlyTransactionCountChart :data="monthlyTransactionCounts" />
        </n-collapse-item>
      </n-collapse>
    </div>
    </div>
    <!-- 年別ダッシュボード -->
    <div v-else>
      <YearlyBarChart :data="yearlyTotals" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTransactionStore } from '../../stores/transactionStore'
import { useCategoryStore } from '../../stores/categoryStore'
import { useCardStore } from '../../stores/cardStore'
// グラフコンポーネント
import MonthlyBarChart from '../../components/Graph/MonthlyBarChart.vue'
import YearlyBarChart from '../../components/Graph/YearlyBarChart.vue'
import CategoryPieChart from '../../components/Graph/CategoryPieChart.vue'
import CardPieChart from '../../components/Graph/CardPieChart.vue'
import WeeklyBarChart from '../../components/Graph/WeeklyBarChart.vue'
import MonthlyTransactionCountChart from '../../components/Graph/MonthlyTransactionCountChart.vue'

// 型
import type { Transaction } from '../../types/Transaction'

// UI
import { NCollapse, NCollapseItem } from 'naive-ui'
const isLoaded = ref(false)

const activeTab = ref<'month' | 'year'>('month')
const transactionStore = useTransactionStore()
const categoryStore = useCategoryStore()
const cardStore = useCardStore()
const transactions = transactionStore.transactions

// -----------------------------
// 集計ロジック
// -----------------------------
onMounted(async () => {
  await Promise.all([
    transactionStore.loadTransactions(),
    categoryStore.loadCategories(),
    cardStore.loadCards()
  ])
  isLoaded.value = true
})

function groupByMonth(transactions: Transaction[]): Record<string, number> {
  const map: Record<string, number> = {}
  for (const tx of transactions) {
    const date = new Date(tx.date)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    map[key] = (map[key] || 0) + tx.amount
  }
  return map
}
const monthlyTotals = computed(() => groupByMonth(transactions))

const categoryTotals = computed(() => {
  const map: Record<string, number> = {}
  for (const tx of transactions) {
    map[tx.categoryId] = (map[tx.categoryId] || 0) + tx.amount
  }
  return map
})

const weeklyTotals = computed(() => {
  const map: Record<string, number> = {
    日: 0, 月: 0, 火: 0, 水: 0, 木: 0, 金: 0, 土: 0
  }
  const now = new Date()
  for (const tx of transactions) {
    const date = new Date(tx.date)
    if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()) {
      const day = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()]
      map[day] += tx.amount
    }
  }
  return map
})

const cardTotals = computed(() => {
  const map: Record<string, number> = {}
  const now = new Date()
  for (const tx of transactions) {
    const date = new Date(tx.date)
    if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()) {
      map[tx.cardId] = (map[tx.cardId] || 0) + tx.amount
    }
  }
  return map
})

const stackedTotals = computed(() => {
  const map: Record<string, Record<string, number>> = {}
  for (const tx of transactions) {
    const date = new Date(tx.date)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const category = tx.categoryId
    if (!map[monthKey]) map[monthKey] = {}
    if (!map[monthKey][category]) map[monthKey][category] = 0
    map[monthKey][category] += tx.amount
  }
  return map
})

const monthlyTransactionCounts = computed(() => {
  const map: Record<string, number> = {}
  for (const tx of transactions) {
    const date = new Date(tx.date)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    map[key] = (map[key] || 0) + 1
  }
  return map
})

const yearlyTotals = computed(() => {
  const map: Record<string, number> = {}
  for (const tx of transactions) {
    const year = new Date(tx.date).getFullYear().toString()
    map[year] = (map[year] || 0) + tx.amount
  }
  return map
})
</script>
