export type ParsedTransaction = {
  date: string            // 決済日（YYYY-MM-DD）
  time: string            // 時刻（HH:mm:ss）※任意
  user: string            // 利用者（高西）
  merchant: string        // 支払先（セブンイレブンなど）
  amount: number          // 支払金額
  status: string          // 完了など
  method: string          // 支払方法（PayPay残高、あと払いなど）
  memo?: string           // 任意メモ（merchantと重複しても良い）
}
