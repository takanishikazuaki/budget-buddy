// src/types/transaction.ts

export interface Transaction {
  id: string              // 一意のID
  cardId: string          // PayPayなどのカード種別
  date: string           // 日付（YYYY-MM-DD）
  amount: number          // 金額（マイナスで出金）
  memo?: string           // メモ（任意）
  categoryId:string
}

//新規作成時idを除いた型
export type TransactionCreate = Omit<Transaction, 'id'> & {
  memo?: string  // 省略可能にする
}

