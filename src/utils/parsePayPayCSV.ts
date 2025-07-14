export interface ParsedTransaction {
  date: string
  amount: number
  memo: string
}

export function parsePayPayCSV(data: any[]): ParsedTransaction[] {
  return data
    .filter((row) => row['取引内容'] === '支払い')
    .map((row) => {
      const rawDate = row['取引日']?.trim() ?? ''
      const date = rawDate.split(' ')[0] // "2025-07-13 12:00:00" → "2025-07-13"
      const amountStr = row['出金金額（円）']?.replace(/,/g, '').trim() ?? '0'
      const amount = parseFloat(amountStr)
      const memo = row['取引先']?.trim() ?? ''

      return {
        date,
        amount,
        memo
      }
    })
}
