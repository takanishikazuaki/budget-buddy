<template>
  <form @submit.prevent="submit">
    <div class="mb-2">
      <label class="block mb-1 text-sm">日付</label>
      <input type="date" v-model="date" class="border px-2 py-1 w-full" required />
    </div>
    <div class="mb-2">
      <label class="block mb-1 text-sm">金額</label>
      <input type="number" v-model.number="amount" class="border px-2 py-1 w-full" required />
    </div>
    <div class="mb-2">
      <label class="block mb-1 text-sm">メモ</label>
      <input type="text" v-model="memo" class="border px-2 py-1 w-full" />
    </div>
    <button type="submit" class="mt-2 px-4 py-1 bg-blue-500 text-white rounded">
      登録
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Transaction } from '../stores/transactionStore'

const emit = defineEmits<{
  (e: 'add', payload: Transaction): void
}>()

const amount = ref<number | null>(null)
const date = ref<Date | null>(null)
const memo = ref<string>('')

function submit() {
  if (amount.value !== null && date.value) {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(), // 仮ID
      amount: amount.value,
      date: date.value,
      memo: memo.value,
    }
    emit('add', newTransaction)

    // 初期化
    amount.value = null
    date.value = null
    memo.value = ''
  }
}
</script>
