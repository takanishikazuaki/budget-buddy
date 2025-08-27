// src/features/imports/paypay/usePayPayCsvImport.ts
import { ref, computed } from 'vue'
import Papa from 'papaparse'
import { toYmd } from "../../../shared/utils/date";

export type PreviewRow = { date: string; amount: number; memo: string }

export function usePayPayCsvImport() {
  const preview = ref<PreviewRow[]>([])
  const rawErrors = ref<string[]>([])

  // ユニークキー（同一判定）：日付|金額|メモ|カードID
  const makeKey = (r: PreviewRow, cardId: string | number) =>
    `${r.date}|${r.amount}|${r.memo}|${cardId}`

  function parseFile(file: File, mapFn?: (row: any) => PreviewRow | null) {
    rawErrors.value = []
    return new Promise<void>((resolve) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (res) => {
          const rows = (res.data as any[])
            .map(mapFn ?? defaultMap)
            .filter((x): x is PreviewRow => !!x)
          preview.value = rows
          resolve()
        },
        error: (err) => {
          rawErrors.value.push(err.message)
          preview.value = []
          resolve()
        }
      })
    })
  }

  // PayPay CSV の想定列から PreviewRow へ（必要に応じて調整）
  function defaultMap(r: any): PreviewRow | null {
    try {
      // 例）PayPay の日付列名: "利用日", 金額列: "支払金額", メモ列: "摘要"
      const date = toYmd(r['利用日'] ?? r['日付'] ?? r['Date'])
      const amount = Number(r['支払金額'] ?? r['金額'] ?? r['Amount'])
      const memo = String(r['摘要'] ?? r['メモ'] ?? r['Memo'] ?? '').trim()
      if (!date || Number.isNaN(amount)) return null
      return { date, amount, memo }
    } catch {
      return null
    }
  }

  return { preview, rawErrors, parseFile, makeKey }
}