<template>
<!-- 曜日見出し -->
<div class="grid grid-cols-7 text-center font-semibold text-sm text-gray-600">
  <div v-for="day in daysOfWeek" :key="day">{{ day }}</div>
</div>

<!-- カレンダー本体 -->
<div class="grid">
  <div
    v-for="(cell, index) in calendarMatrix"
    :key="index"
    class="cell"
    :style="{ backgroundColor: getColor(cell.total), color: '#000' }"
  >
    <div v-if="cell.date">{{ cell.date.getDate() }}</div>
    <div v-if="cell.total > 0">¥{{ cell.total.toLocaleString() }}</div>
  </div>
</div>

</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMonthStore } from '../stores/useMonthStore'
const monthStore = useMonthStore()

const currentYear = computed(() => monthStore.year)
const currentMonth = computed(() => monthStore.month)

const props = defineProps<{
  data: Record<string, number>
}>()


const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const calendarMatrix = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDate = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  const matrix: { date: Date | null; total: number }[] = []

  for (let i = 0; i < firstDay.getDay(); i++) {
    matrix.push({ date: null, total: 0 })
  }

  for (let day = 1; day <= lastDate; day++) {
    const date = new Date(currentYear.value, currentMonth.value, day)
    const key = date.toISOString().split('T')[0]
    matrix.push({
      date,
      total: props.data[key] || 0
    })
  }

  return matrix
})

function getColor(amount: number): string {
  if (amount === 0) return '#e5e7eb' // gray-200
  if (amount < 1000) return '#d1fae5' // green-100
  if (amount < 3000) return '#6ee7b7' // green-300
  if (amount < 10000) return '#34d399' // green-400
  return '#059669' // green-600
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.cell {
  min-height: 60px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  padding: 4px;
}

</style>
