<template>
  <div>
    <h2 class="text-xl font-bold mb-4">支出ダッシュボード</h2>

    <section>
      <h3 class="text-lg font-semibold mb-2">月ごとの支出</h3>
      <MonthlyBarChart :data="monthlyTotals" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTransactionStore } from '../stores/transactionStore'
import MonthlyBarChart from '../components/MonthlyBarChart.vue'
import type { Transaction } from '../types/Transaction'
import { onMounted } from 'vue'

const transactionStore = useTransactionStore()
const transactions = transactionStore.transactions

onMounted(() => {
  if (transactionStore.transactions.length === 0) {
    transactionStore.addTransaction({
      id: 'dummy1',
      cardId: 'paypay',
      date: '2025-07-01',
      amount: 4500,
      memo: 'スターバックス'
    })
    transactionStore.addTransaction({
      id: 'dummy2',
      cardId: 'paypay',
      date: '2025-07-05',
      amount: 9800,
      memo: 'Amazon購入'
    })
    transactionStore.addTransaction({
      id: 'dummy3',
      cardId: 'rakuten',
      date: '2025-08-02',
      amount: 1200,
      memo: 'セブンイレブン'
    })
    transactionStore.addTransaction({
      id: 'dummy4',
      cardId: 'rakuten',
      date: '2025-08-15',
      amount: 3000,
      memo: '書籍購入'
    })
    transactionStore.addTransaction({
      id: 'dummy5',
      cardId: 'sbi',
      date: '2025-03-02',
      amount: 5000,
      memo: 'クレカ引き落とし'
    })
  }
})



function groupByMonth(transactions: Transaction[]): Record<string, number> {
  const map: Record<string, number> = {}
  for (const tx of transactions) {
    const date = new Date(tx.date)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    map[key] = (map[key] || 0) + tx.amount
  }
  return map
}

const monthlyTotals = computed(() => groupByMonth(transactions))
</script>
