import { defineStore } from 'pinia'

export type Transaction = {
    id:string;
    amount:number;
    date:Date;
    memo:string;
    //プラスかマイナスかのフラグが欲しい。
}

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [] as Transaction[],
  }),
  getters: {
    totalAmount(state): number {
      return state.transactions.reduce((sum, t) => sum + t.amount, 0)
    }
  },
  actions: {
    addTransaction(newItem: Transaction) {
      this.transactions.push(newItem)
    }
  }
})
