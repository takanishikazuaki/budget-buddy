import { defineStore } from 'pinia'
import type { Category, CategoryCreate } from '../types/category'
import * as categoryService from '../services/categoryService'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [] as Category[]
  }),
  actions: {
    async loadCategories() {
      try {
        this.categories = await categoryService.fetchCategories()
      } catch (e) {
        console.error('カテゴリ取得失敗', e)
      }
    },
    async addCategory(category: CategoryCreate) {
      try {
        const newCategory = await categoryService.createCategory(category)
        this.categories.push(newCategory)
      } catch (e) {
        console.error('カテゴリ追加失敗', e)
      }
    },
    async removeCategory(id: string) {
      try {
        await categoryService.deleteCategory(id)
        this.categories = this.categories.filter(c => c.id !== id)
      } catch (e) {
        console.error('カテゴリ削除失敗', e)
      }
    }
  }
})
