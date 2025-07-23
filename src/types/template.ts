export interface Template {
  id: string
  name: string
  amount: number
  memo: string
  cardId: string
  categoryId: string
}

export type TemplateCreate = Omit<Template,'id'>