import { defineStore } from 'pinia'

export type Card = {
  id: string
  name: string
}

export const useCardStore = defineStore('card', {
  state: () => ({
    cards: [] as Card[]
  }),
  getters: {
    cardCount: (state) => state.cards.length
  },
  actions: {
    addCard(newCard: Card) {
      this.cards.push(newCard)
    },
    removeCard(id: string) {
      this.cards = this.cards.filter(card => card.id !== id)
    }
  }
})
