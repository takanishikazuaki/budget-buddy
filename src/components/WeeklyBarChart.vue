<template>
  <div>
    <Bar ref="chartRef" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js'
import { computed, ref, watch } from 'vue'
import { useTransactionStore } from '../stores/transactionStore'
import { useMonthStore } from '../stores/useMonthStore'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title)

const transactionStore = useTransactionStore()
const monthStore = useMonthStore()
const chartRef = ref() // Chart インスタンス参照用

const weekdays = ['日', '月', '火', '水', '木', '金', '土']

// 曜日ごとの集計
const weeklyTotals = computed(() => {
  const result: Record<string, number> = {
    日: 0, 月: 0, 火: 0, 水: 0, 木: 0, 金: 0, 土: 0
  }

  const year = monthStore.year
  const month = monthStore.month + 1

  for (const tx of transactionStore.transactions) {
    const txDate = new Date(tx.date)
    const txYear = txDate.getFullYear()
    const txMonth = txDate.getMonth() + 1

    if (txYear === year && txMonth === month) {
      const weekday = weekdays[txDate.getDay()]
      result[weekday] += tx.amount
    }
  }

  return result
})

const chartData = computed(() => ({
  labels: weekdays,
  datasets: [
    {
      label: '曜日別支出（円）',
      data: weekdays.map(day => weeklyTotals.value[day] || 0),
      backgroundColor: '#3b82f6'
    }
  ]
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}

// グラフの更新を反映
watch(weeklyTotals, () => {
  chartRef.value?.chart?.update()
})
</script>
