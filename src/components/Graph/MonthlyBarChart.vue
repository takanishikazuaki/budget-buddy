<template>
  <div>
    <Bar ref="chartRef" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { Bar } from 'vue-chartjs'
import type { ChartData, ChartOptions, Chart } from 'chart.js'
import { useMonthStore } from '../../stores/useMonthStore'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(
  Title, Tooltip, Legend,
  BarElement, LineElement, PointElement,
  CategoryScale, LinearScale
)

const chartRef = ref<{ chart: Chart<'bar' | 'line'> } | null>(null)

const props = defineProps<{
  data: Record<string, number>
}>()

const monthStore = useMonthStore()

const months = computed(() => {
  const result: { key: string, label: string }[] = []
  const baseDate = new Date(monthStore.year, monthStore.month)

  for (let i = 11; i >= 0; i--) {
    const date = new Date(baseDate)
    date.setMonth(date.getMonth() - i)
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    result.push({
      key: `${y}-${m}`,
      label: `${y}年${Number(m)}月`
    })
  }

  return result
})

const barData = computed(() =>
  months.value.map(({ key }) => props.data[key] ?? 0)
)

const avgValue = computed(() => {
  const validValues = barData.value.filter(v => typeof v === 'number')
  if (validValues.length === 0) return 0
  return validValues.reduce((sum, v) => sum + v, 0) / validValues.length
})

const chartData = computed<ChartData<'bar' | 'line'>>(() => ({
  labels: months.value.map(m => m.label),
  datasets: [
    {
      type: 'bar',
      label: '支出額（円）',
      data: barData.value,
      backgroundColor: '#3b82f6'
    },
    {
      type: 'line',
      label: '平均支出額',
      data: Array(12).fill(avgValue.value),
      borderColor: '#f59e0b',
      borderWidth: 2,
      pointRadius: 0,
      fill: false
    }
  ]
}))

const chartOptions: ChartOptions<'bar' | 'line'> = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: {
      display: true,
      text: '過去12ヶ月の支出と平均'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}

watch(() => props.data, async () => {
  await nextTick()
  const chart = chartRef.value?.chart
  if (chart) {
    chart.data.datasets[0].data = barData.value
    chart.data.datasets[1].data = Array(12).fill(avgValue.value)
    chart.update()
  }
})
</script>
