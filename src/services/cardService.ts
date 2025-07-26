import { apiClient } from './apiClient'
import { CardCreate } from '../types/card'

export interface Card extends CardCreate {
  id: string
}

export async function fetchCards(): Promise<Card[]> {
  const response = await apiClient.get('/cards/')
  return response.data
}

export async function createCard(card: CardCreate): Promise<Card> {
  const response = await apiClient.post('/cards/', card)
  return response.data
}

export async function deleteCard(id:string):Promise<void>{
    await apiClient.delete(`/cards/${id}`)
}