<template>
  <div v-if="transactions?.length === 0" class="text-sm text-gray-500">
    データがありません
  </div>
  <ul v-else class="space-y-2">
    <li v-for="tx in transactions" :key="tx.id" class="border p-2 rounded">
      <div class="text-sm">
        <strong>{{ tx.date }}</strong> - ¥{{ tx.amount.toLocaleString() }}
      </div>
      <div class="text-xs text-gray-600">{{ tx.memo }}</div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Transaction } from '../stores/transactionStore.ts'

defineProps<{
  transactions?: Transaction[]
}>()
</script>
