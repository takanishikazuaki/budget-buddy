<template>
  <h2>PayPay CSVファイルを取り込み</h2>
  <input type="file" accept=".csv" @change="handleFileChange" />

  <div v-if="preview.length">
    <h3>プレビュー</h3>
    <table>
      <thread>
        <tr>
          <th>日付</th>
          <th>金額</th>
          <th>メモ</th>
        </tr>
      </thread>
      <tbody>
        <tr v-for="(row, index) in preview" :key="index">
          <td>{{ row.date }}</td>
          <td>{{ row.amount }}</td>
          <td>{{ row.memo }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="registerTransactions">登録</button>
  </div>
</template>

<script setup lang="ts">
import Papa from 'papaparse'
import { ref } from 'vue'
import { parsePayPayCSV } from '../utils/parsePayPayCSV'
import { useTransactionStore } from '../stores/transactionStore'

const preview = ref<{ date: string; amount: number; memo: string }[]>([])
const transactionStore = useTransactionStore()

function handleFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  Papa.parse(file, {
    header: true,
    complete: (results) => {
      const rawData = results.data as any[]
      preview.value = parsePayPayCSV(rawData)
    }
  })
  console.log("Parsed Preview:", preview.value)
}

function registerTransactions() {
  const paypayCardId = 'paypay' // cardId を固定で付与
  const existing = transactionStore.transactions

  // フィルター：すでに同じ日付・金額・メモ・カードIDがあるかチェック
  const newTransactions = preview.value.filter((row) => {
    return !existing.some((t) =>
      t.date === row.date &&
      t.amount === row.amount &&
      t.memo === row.memo &&
      t.cardId === paypayCardId
    )
  })

  // 重複なしのものだけ追加
  for (const row of newTransactions) {
    transactionStore.addTransaction({
      id: crypto.randomUUID(),
      date: row.date,
      amount: row.amount,
      memo: row.memo,
      cardId: paypayCardId
    })
  }

  // 完了後、プレビューをクリア
  preview.value = []
}

</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.table-preview {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.table-preview th,
.table-preview td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}

.register-button {
  margin-top: 1rem;
  float: right;
}
</style>

