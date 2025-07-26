import humps from 'humps'
import { apiClient } from './apiClient'
import type { TransactionCreate } from '../types/Transaction'

export interface Transaction extends TransactionCreate {
  id: string
}

// 取引一覧を取得（GET /transactions/）
export async function fetchTransactions(): Promise<Transaction[]> {
  const response = await apiClient.get('/transactions/')
  return humps.camelizeKeys(response.data) as Transaction[]
}

// 新規作成（POST /transactions/）
export async function createTransaction(tx: TransactionCreate): Promise<Transaction> {
  const payload = humps.decamelizeKeys(tx)
  const response = await apiClient.post('/transactions/', payload)
  return humps.camelizeKeys(response.data) as Transaction
}

// 取引1件取得（GET /transactions/:id）
export async function getTransaction(id: string): Promise<Transaction> {
  const response = await apiClient.get(`/transactions/${id}`)
  return humps.camelizeKeys(response.data) as Transaction
}

// 更新（PUT /transactions/:id）
export async function updateTransaction(id: string, tx: TransactionCreate): Promise<Transaction> {
  const payload = humps.decamelizeKeys(tx)
  const response = await apiClient.put(`/transactions/${id}`, payload)
  return humps.camelizeKeys(response.data) as Transaction
}

// 削除（DELETE /transactions/:id）
export async function deleteTransaction(id: string): Promise<void> {
  await apiClient.delete(`/transactions/${id}`)
}
