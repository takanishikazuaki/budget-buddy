import { apiClient } from './apiClient'
import { TransactionCreate } from '../types/Transaction'

export interface Transaction extends TransactionCreate {
  id: string
}

export async function createTransaction(data: TransactionCreate): Promise<Transaction> {
  const response = await apiClient.post('/transactions/', data)
  return response.data
}

export async function fetchTransactions(): Promise<Transaction[]> {
  const response = await apiClient.get('/transactions/')
  return response.data
}

export async function deleteTransaction(id: string): Promise<void> {
  await apiClient.delete(`/transactions/${id}`)
}
