import { apiClient } from './apiClient'
import { CategoryCreate } from '../types/category'

export interface Category extends CategoryCreate {
  id: string
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await apiClient.get('/categories/')
  return response.data
}

export async function createCategory(category: CategoryCreate): Promise<Category> {
  const response = await apiClient.post('/categories/', category)
  return response.data
}

export async function deleteCategory(id:string):Promise<void>{
    await apiClient.delete(`/categories/${id}`)
}