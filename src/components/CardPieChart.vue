<template>
  <div>
    <PieChart ref="chartRef" :chart-data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { computed, ref, watch } from 'vue'
import { PieChart } from 'vue-chart-3'
import { useTransactionStore } from '../stores/transactionStore'
import { useMonthStore } from '../stores/useMonthStore'

ChartJS.register(ArcElement, Tooltip, Legend)

const chartRef = ref()

const transactionStore = useTransactionStore()
const monthStore = useMonthStore()

// カード別に月内での合計金額を集計
const cardTotals = computed(() => {
  const result: Record<string, number> = {}

  const year = monthStore.year
  const month = monthStore.month + 1

  for (const tx of transactionStore.transactions) {
    const txDate = new Date(tx.date)
    const txYear = txDate.getFullYear()
    const txMonth = txDate.getMonth() + 1

    if (txYear === year && txMonth === month) {
      if (!result[tx.cardId]) result[tx.cardId] = 0
      result[tx.cardId] += tx.amount
    }
  }

  return result
})

// 動的に色を生成（必要数に応じて）
const generateColors = (count: number): string[] => {
  const baseColors = [
    '#f87171', '#60a5fa', '#facc15', '#34d399', '#a78bfa', '#fb923c',
    '#f472b6', '#38bdf8', '#4ade80', '#fcd34d'
  ]
  return Array.from({ length: count }, (_, i) => baseColors[i % baseColors.length])
}

const chartData = computed(() => {
  const labels = Object.keys(cardTotals.value)
  const data = Object.values(cardTotals.value)

  return {
    labels,
    datasets: [
      {
        label: 'カード別支出（円）',
        data,
        backgroundColor: generateColors(labels.length)
      }
    ]
  }
})

watch(chartData, () => {
  chartRef.value?.update()
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
}
</script>
