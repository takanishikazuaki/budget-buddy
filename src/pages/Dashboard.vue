<template>
  <div>
    <h2 class="text-xl font-bold mb-4">支出ダッシュボード</h2>

    <!-- タブ切り替え -->
    <div class="flex gap-4 mb-6">
      <button
        class="px-4 py-2 rounded"
        :class="activeTab === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'"
        @click="activeTab = 'month'"
      >月別</button>

      <button
        class="px-4 py-2 rounded"
        :class="activeTab === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200'"
        @click="activeTab = 'year'"
      >年別</button>
    </div>

    <!-- 月別ダッシュボード -->
    <div v-if="activeTab === 'month'">
      <section class="mb-6">
        <h3 class="text-lg font-semibold mb-2">月ごとの支出</h3>
        <MonthlyBarChart :data="monthlyTotals" />
      </section>

      <section class="mb-6">
        <h3 class="text-lg font-semibold mb-2">カテゴリーごとの支出</h3>
        <CategoryPieChart :data="categoryTotals" />
      </section>
      
      <section class="mb-6">
        <h3 class="text-lg font-semibold mb-2">曜日ごとの支出</h3>
        <WeeklyBarChart :data="weeklyTotals" />
      </section>

      <section class="mb-6">
        <h3 class="text-lg font-semibold mb-2">カード別支出割合（今月）</h3>
        <CardPieChart :data="cardTotals" />
      </section>

      <section class="mb-6">
        <h3 class="text-lg font-semibold mb-2">カテゴリ別支出の推移（月別）</h3>
        <StackedBarChart :data="stackedTotals" />
      </section>

      <section class="mb-6">
        <h3 class="text-lg font-semibold mb-2">月別取引件数</h3>
        <MonthlyTransactionCountChart :data="monthlyTransactionCounts" />
      </section>

    </div>


    <!-- 年別ダッシュボード -->
    <div v-else>
      <h3 class="text-lg font-semibold mb-2">年ごとの支出</h3>
      <YearlyBarChart :data="yearlyTotals" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed,onMounted } from 'vue'
import { useTransactionStore } from '../stores/transactionStore'
import MonthlyBarChart from '../components/MonthlyBarChart.vue'
import YearlyBarChart from '../components/YearlyBarChart.vue'
import CategoryPieChart from '../components/CategoryPieChart.vue'
import type { Transaction } from '../types/Transaction'
import CardPieChart from '../components/CardPieChart.vue'
import WeeklyBarChart from '../components/WeeklyBarChart.vue'
import StackedBarChart from '../components/StackedBarChart.vue'
import MonthlyTransactionCountChart from '../components/MonthlyTransactionCountChart.vue'

const activeTab = ref<'month' | 'year'>('month')
const transactionStore = useTransactionStore()
const transactions = transactionStore.transactions

onMounted(() => {
  if (transactionStore.transactions.length === 0) {
    transactionStore.addTransaction({
      id: 'dummy1',
      cardId: 'paypay',
      date: '2025-07-01',
      amount: 4500,
      memo: 'スターバックス',
      categoryId:'食費'
    })
    transactionStore.addTransaction({
      id: 'dummy2',
      cardId: 'paypay',
      date: '2025-07-05',
      amount: 9800,
      memo: 'Amazon購入',
      categoryId:'食費'
    })
    transactionStore.addTransaction({
      id: 'dummy3',
      cardId: 'rakuten',
      date: '2025-08-02',
      amount: 1200,
      memo: 'セブンイレブン',
      categoryId:'食費'
    })
    transactionStore.addTransaction({
      id: 'dummy4',
      cardId: 'rakuten',
      date: '2025-08-15',
      amount: 3000,
      memo: '書籍購入',
      categoryId:'食費'
    })
    transactionStore.addTransaction({
      id: 'dummy5',
      cardId: 'sbi',
      date: '2025-03-02',
      amount: 5000,
      memo: 'クレカ引き落とし',
      categoryId:'食費'
    })
  }
})



// 月別集計
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

//カテゴリー別集計
const categoryTotals = computed(() => {
  const map: Record<string, number> = {}
  for (const tx of transactions) {
    map[tx.categoryId] = (map[tx.categoryId] || 0) + tx.amount
  }
  return map
})

//曜日別
const weeklyTotals = computed(() => {
  const map: Record<string, number> = {
    日: 0, 月: 0, 火: 0, 水: 0, 木: 0, 金: 0, 土: 0
  }

  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  for (const tx of transactions) {
    const date = new Date(tx.date)
    if (date.getFullYear() === currentYear && date.getMonth() === currentMonth) {
      const day = date.getDay() // 0〜6（日〜土）
      const label = ['日', '月', '火', '水', '木', '金', '土'][day]
      map[label] += tx.amount
    }
  }

  return map
})

//カード別
const cardTotals = computed(() => {
  const map: Record<string, number> = {}

  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  for (const tx of transactions) {
    const date = new Date(tx.date)
    if (date.getFullYear() === currentYear && date.getMonth() === currentMonth) {
      map[tx.cardId] = (map[tx.cardId] || 0) + tx.amount
    }
  }

  return map
})

//カテゴリ別積み上げ棒グラフ
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

//月別取引件数
const monthlyTransactionCounts = computed(() => {
  const map: Record<string, number> = {}

  for (const tx of transactions) {
    const date = new Date(tx.date)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    map[key] = (map[key] || 0) + 1
  }

  return map
})

//日付合算
const dailyTotals = computed(() => {
  const map: Record<string, number> = {}

  for (const tx of transactions) {
    const date = new Date(tx.date)
    const key = date.toISOString().split('T')[0]  // 例: "2025-07-13"
    map[key] = (map[key] || 0) + tx.amount
  }

  return map
})



// 年別集計
function groupByYear(transactions: Transaction[]): Record<string, number> {
  const map: Record<string, number> = {}
  for (const tx of transactions) {
    const date = new Date(tx.date)
    const key = `${date.getFullYear()}`
    map[key] = (map[key] || 0) + tx.amount
  }
  return map
}
const yearlyTotals = computed(() => groupByYear(transactions))
</script>

