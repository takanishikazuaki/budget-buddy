<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
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

// propsとして { '2025-07': 12000, '2025-08': 15000 } のようなオブジェクトを受け取る
const props = defineProps<{
  data: Record<string, number>
}>()

const chartData = computed(() => ({
  labels: Object.keys(props.data),
  datasets: [
    {
      label: '年別支出額（円）',
      data: Object.values(props.data),
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
  }
}
</script>
