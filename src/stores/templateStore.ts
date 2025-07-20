import { defineStore } from 'pinia'

export interface Template {
  id: string
  name: string
  amount: number
  memo: string
  cardId: string
  categoryId: string
}

export const useTemplateStore = defineStore('templateStore', {
  state: () => ({
    templates: [] as Template[]
  }),
  actions: {
    addTemplate(tpl: Template) {
      this.templates.push(tpl)
    },
    deleteTemplate(id: string) {
      this.templates = this.templates.filter(t => t.id !== id)
    }
  }
})
