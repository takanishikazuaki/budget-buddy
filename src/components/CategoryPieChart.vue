<template>
  <PieChart :chart-data="chartData" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTransactionStore } from '../stores/transactionStore'
import { PieChart } from 'vue-chart-3'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { useCategoryStore } from '../stores/categoryStore'
ChartJS.register(Title, Tooltip, Legend, ArcElement)

const transactionStore = useTransactionStore()
const transactions = transactionStore.transactions
const categoryStore = useCategoryStore()

const chartData = computed(() => {
  const labels = Object.keys(categoryTotals.value)
  const backgroundColors = labels.map(label => {
    const cat = categoryStore.categories.find(c => c.id === label)
    return cat?.color || '#ccc' // 色がなければグレー
  })

  return {
    labels,
    datasets: [
      {
        data: Object.values(categoryTotals.value),
        backgroundColor: backgroundColors
      }
    ]
  }
})

const categoryTotals = computed(() => {
  const map: Record<string, number> = {}
  for (const tx of transactions) {
    if (!map[tx.categoryId]) map[tx.categoryId] = 0
    map[tx.categoryId] += tx.amount
  }
  return map
})
</script>
