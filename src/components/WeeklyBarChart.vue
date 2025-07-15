<template>
  <div>
    <Bar :data="chartData" :options="chartOptions" />
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
import { computed } from 'vue'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title)

const props = defineProps<{
  data: Record<string, number>
}>()

const chartData = computed(() => ({
  labels: ['日', '月', '火', '水', '木', '金', '土'],
  datasets: [
    {
      label: '曜日別支出（円）',
      data: ['日', '月', '火', '水', '木', '金', '土'].map(day => props.data[day] || 0),
      backgroundColor: 'rgba(54, 162, 235, 0.5)'
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
</script>
