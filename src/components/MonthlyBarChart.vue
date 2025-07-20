<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { useMonthStore } from '../stores/useMonthStore' // 追加
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const monthStore = useMonthStore()

const props = defineProps<{
  data: Record<string, number>  // e.g. { '2025-07': 10000, '2025-08': 20000 }
}>()

const chartData = computed(() => {
  const currentKey = `${monthStore.year}-${String(monthStore.month + 1).padStart(2, '0')}`
  const value = props.data[currentKey] || 0

  return {
    labels: [currentKey],
    datasets: [
      {
        label: '支出額（円）',
        data: [value],
        backgroundColor: '#3b82f6'
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false }
  }
}
</script>
