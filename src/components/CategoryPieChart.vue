<template>
  <PieChart ref="chartRef" :chart-data="chartData" />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useTransactionStore } from '../stores/transactionStore'
import { useCategoryStore } from '../stores/categoryStore'
import { useMonthStore } from '../stores/useMonthStore'
import { PieChart } from 'vue-chart-3'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import type { ChartData } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const chartRef = ref()

const transactionStore = useTransactionStore()
const categoryStore = useCategoryStore()
const monthStore = useMonthStore()

// 対象月のトランザクションフィルタ
const currentMonthTransactions = computed(() => {
  const targetYear = monthStore.year
  const targetMonth = monthStore.month + 1
  return transactionStore.transactions.filter(tx => {
    const txDate = new Date(tx.date)
    return (
      txDate.getFullYear() === targetYear &&
      txDate.getMonth() + 1 === targetMonth
    )
  })
})

// カテゴリ別合計
const categoryTotals = computed(() => {
  const map: Record<string, number> = {}
  for (const tx of currentMonthTransactions.value) {
    if (!map[tx.categoryId]) map[tx.categoryId] = 0
    map[tx.categoryId] += tx.amount
  }
  return map
})

// グラフデータ
const chartData = computed<ChartData<'pie'>>(() => {
  const labels = categoryStore.categories.map(c => c.name)
  const backgroundColors = categoryStore.categories.map(c => c.color || '#ccc')
  const data = categoryStore.categories.map(c => categoryTotals.value[c.id] || 0)

  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: backgroundColors
      }
    ]
  }
})

// チャートの再描画
watch(chartData, () => {
  chartRef.value?.update()
})
</script>
