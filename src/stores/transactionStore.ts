import { defineStore } from 'pinia'
import type { Transaction, TransactionCreate } from '../types/Transaction'
import * as transactionService from '../services/transactionService'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [] as Transaction[],
  }),
  actions: {
    async loadTransactions() {
      try {
        const txs = await transactionService.fetchTransactions()
        this.transactions = txs
      } catch (error) {
        console.error('Failed to load transactions', error)
      }
    },
    async addTransaction(tx: TransactionCreate) {
      try {
        const newTx = await transactionService.createTransaction(tx)
        this.transactions.push(newTx)
      } catch (error) {
        console.error('Failed to add transaction', error)
      }
    },
    async updateTransaction(id: string, tx: TransactionCreate) {
      try {
        const updatedTx = await transactionService.updateTransaction(id, tx)
        const index = this.transactions.findIndex(t => t.id === id)
        if (index !== -1) {
          this.transactions[index] = updatedTx
        }
      } catch (error) {
        console.error('Failed to update transaction', error)
      }
    },
    clearTransactions() {
      this.transactions = []
    },
    async removeTransaction(id: string) {
      try {
        await transactionService.deleteTransaction(id)
        this.transactions = this.transactions.filter(t => t.id !== id)
      } catch (error) {
        console.error('Failed to delete transaction', error)
      }
    },
  },
})
