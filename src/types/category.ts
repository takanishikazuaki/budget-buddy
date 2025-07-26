export interface Category {
  id: string
  name: string
  color: string  // ← 追加
}

export type CategoryCreate = Omit<Category,'id'>