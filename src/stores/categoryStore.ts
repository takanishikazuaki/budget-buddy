import { defineStore } from 'pinia'

export interface Category {
  id: string
  name: string
  color: string  // ← 追加
}


export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [] as Category[]
  }),
  actions: {
    addCategory(category: Category) {
      this.categories.push(category)
    },
    removeCategory(id: string) {
      this.categories = this.categories.filter(cat => cat.id !== id)
    }
  }
})
