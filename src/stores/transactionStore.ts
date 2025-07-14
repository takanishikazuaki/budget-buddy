// src/stores/transactionStore.ts

import { defineStore } from 'pinia'
import type { Transaction } from '../types/Transaction'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [] as Transaction[],
  }),
  actions: {
    addTransaction(tx: Transaction) {
      this.transactions.push(tx)
    },
    addTransactions(txs: Transaction[]) {
      this.transactions.push(...txs)
    },
    clearTransactions() {
      this.transactions = []
    },
    removeTransaction(id: string) {
      this.transactions = this.transactions.filter(t => t.id !== id)
    },
  },
})
