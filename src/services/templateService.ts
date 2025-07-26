import humps from 'humps'
import { apiClient } from './apiClient'
import { TemplateCreate } from '../types/template'

export interface Template extends TemplateCreate {
  id: string
}

export async function fetchTemplates(): Promise<Template[]> {
  const response = await apiClient.get('/templates/')
  // 受信データをキャメルケース化
  return humps.camelizeKeys(response.data) as Template[]
}

export async function createTemplate(template: TemplateCreate): Promise<Template> {
  // 送信データをスネークケース化
  const payload = humps.decamelizeKeys(template)
  const response = await apiClient.post('/templates/', payload)
  // 受信データをキャメルケース化
  return humps.camelizeKeys(response.data) as Template
}

export async function deleteTemplate(id: string): Promise<void> {
  await apiClient.delete(`/templates/${id}`)
}
