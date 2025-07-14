// stores/cardStore.ts
import { defineStore } from 'pinia'
import type { Card } from '../types/Card'

export const useCardStore = defineStore('card', {
  state: () => ({
    cards: [
      { id: 'paypay', name: 'PayPay' },
      { id: 'rakuten', name: '楽天カード' },
      { id: 'manual', name: '手入力（現金）' }
    ] as Card[]
  }),
  actions: {
    addCard(card: Card) {
      this.cards.push(card)
    },
    removeCard(cardId: string) {
      this.cards = this.cards.filter((c) => c.id !== cardId)
    }
  }
})
