// src/types/transaction.ts

export interface Transaction {
  id: string              // 一意のID
  cardId: string          // PayPayなどのカード種別
  date: string            // 日付（YYYY-MM-DD）
  amount: number          // 金額（マイナスで出金）
  memo?: string           // メモ（任意）
}
