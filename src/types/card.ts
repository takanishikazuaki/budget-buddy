// types/card.ts
export interface Card {
  id: string; // 例: 'paypay', 'rakuten', 'manual'
  name: string; // 表示名: 'PayPay', '楽天カード', '手入力' など
  color?: string; // UI用（後々のUI強化用）
}

//新規作成時idを抜いた型
export type CardCreate = Omit<Card, 'id'>