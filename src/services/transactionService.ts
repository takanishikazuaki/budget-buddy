import humps from 'humps'
import { apiClient } from './apiClient'
import { TransactionCreate } from '../types/Transaction'

export interface Transaction extends TransactionCreate {
  id: string
}

export async function createTransaction(data: TransactionCreate): Promise<Transaction> {
    const payload = humps.decamelizeKeys(data)
    const response = await apiClient.post('/transactions/', payload)
    return humps.camelizeKeys(response.data) as Transaction 
}

export async function fetchTransactions(): Promise<Transaction[]> {
  const response = await apiClient.get('/transactions/')
  return humps.camelizeKeys(response.data) as Transaction[]
}

export async function deleteTransaction(id: string): Promise<void> {
  await apiClient.delete(`/transactions/${id}`)
}
