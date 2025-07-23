import { defineStore } from 'pinia'
import type { Template, TemplateCreate } from '../types/template'
import * as templateService from '../services/templateService'

export const useTemplateStore = defineStore('templateStore', {
  state: () => ({
    templates: [] as Template[]
  }),
  actions: {
    async loadTemplates() {
      try {
        this.templates = await templateService.fetchTemplates()
      } catch (e) {
        console.error('テンプレート取得失敗', e)
      }
    },
    async addTemplate(tpl: TemplateCreate) {
      try {
        const newTpl = await templateService.createTemplate(tpl)
        this.templates.push(newTpl)
      } catch (e) {
        console.error('テンプレート追加失敗', e)
      }
    },
    async deleteTemplate(id: string) {
      try {
        await templateService.deleteTemplate(id)
        this.templates = this.templates.filter(t => t.id !== id)
      } catch (e) {
        console.error('テンプレート削除失敗', e)
      }
    }
  }
})
