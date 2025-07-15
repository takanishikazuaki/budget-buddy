<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title)

const props = defineProps<{
  data: Record<string, Record<string, number>>
}>()

const chartData = computed(() => {
  const months = Object.keys(props.data).sort()
  const allCategories = Array.from(
    new Set(months.flatMap(month => Object.keys(props.data[month])))
  )

  const datasets = allCategories.map(category => ({
    label: category,
    data: months.map(month => props.data[month][category] || 0),
    stack: 'total'
  }))

  return {
    labels: months,
    datasets
  }
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: false
    }
  },
  scales: {
    x: {
      stacked: true
    },
    y: {
      stacked: true,
      beginAtZero: true
    }
  }
}
</script>
