// utils/parsePayPayCSV.ts
import Papa from 'papaparse'
import type { Transaction } from '../stores/transactionStore'

export function parsePayPayCSV(csvText: string): Transaction[] {
  const results = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  })

  return results.data.map((row: any, index: number): Transaction => ({
    id: `paypay-${index}`,
    cardId: 'paypay',
    date: row['利用日'],
    category: row['カテゴリ'] || '',
    amount: Number(row['利用金額（税込）'].replace(/,/g, '')) || 0,
    paymentMethod: row['支払方法'] || '',
    merchant: row['利用先（加盟店名）'] || '',
    status: row['ステータス'] || '',
  }))
}
