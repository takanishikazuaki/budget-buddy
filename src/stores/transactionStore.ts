import { defineStore } from 'pinia'

export interface Transaction {
  id: string              // 一意なID（"paypay-001" など）
  cardId: string          // "paypay" や "rakuten" などカードの識別子
  date: string            // "2025-07-01" など（ISO形式の日付）
  category: string        // "食料品", "交通" など（PayPayカテゴリ）
  amount: number          // 利用金額（正の数）
  paymentMethod: string   // "PayPay残高", "クレジット", "ポイント" など
  merchant: string        // 利用先（加盟店名）
  status: string          // "支払い完了", "キャンセル" など
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
