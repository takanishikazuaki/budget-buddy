import { apiClient } from './apiClient'
import { TemplateCreate} from '../types/template'

export interface Template extends TemplateCreate {
  id: string
}

export async function fetchTemplates(): Promise<Template[]> {
  const response = await apiClient.get('/templates/')
  return response.data
}

export async function createTemplate(template: TemplateCreate): Promise<Template> {
  const response = await apiClient.post('/templates/', template)
  return response.data
}

export async function deleteTemplate(id: string): Promise<void> {
  await apiClient.delete(`/templates/${id}`)
}
