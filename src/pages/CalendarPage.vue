<template>
  <div>
    <h2 class="text-xl font-bold mb-4">カレンダー</h2>
    <CalendarHeatMap :data="dailyTotals" :year="currentYear" :month="currentMonth" />
  </div>
</template>

<script setup lang="ts">
import CalendarHeatMap from '../components/CalendarHeatMap.vue'
import { computed } from 'vue'
import { useTransactionStore } from '../stores/transactionStore'

const transactionStore = useTransactionStore()
const transactions = transactionStore.transactions

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()

const dailyTotals = computed(() => {
  const map: Record<string, number> = {}

  for (const tx of transactions) {
    const date = new Date(tx.date)
    const key = date.toISOString().split('T')[0]
    map[key] = (map[key] || 0) + tx.amount
  }

  return map
})
</script>
