// services/transactionService.ts
import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000/transactions'

export interface TransactionPayload {
  date: string
  amount: number
  memo: string
  card_id: string
  category_id: string
}

export function createTransaction(data: TransactionPayload) {
  return axios.post(`${API_BASE_URL}/`, data)
}

export function getTransactions() {
  return axios.get(API_BASE_URL)
}

export function getTransaction(id: string) {
  return axios.get(`${API_BASE_URL}/${id}`)
}

export function updateTransaction(id: string, data: TransactionPayload) {
  return axios.put(`${API_BASE_URL}/${id}`, data)
}

export function deleteTransaction(id: string) {
  return axios.delete(`${API_BASE_URL}/${id}`)
}
