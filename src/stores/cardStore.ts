import { defineStore } from 'pinia'
import type { Card, CardCreate } from '../types/card'
import * as cardService from '../services/cardService'

export const useCardStore = defineStore('card', {
  state: () => ({
    cards: [] as Card[]
  }),
  actions: {
    async loadCards() {
      try {
        this.cards = await cardService.fetchCards()
      } catch (e) {
        console.error('カード取得失敗', e)
      }
    },
    async addCard(card: CardCreate) {
      try {
        const newCard = await cardService.createCard(card)
        this.cards.push(newCard)
      } catch (e) {
        console.error('カード追加失敗', e)
      }
    },
    async removeCard(cardId: string) {
      try {
        await cardService.deleteCard(cardId)
        this.cards = this.cards.filter(c => c.id !== cardId)
      } catch (e) {
        console.error('カード削除失敗', e)
      }
    }
  }
})
