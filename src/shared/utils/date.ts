// src/shared/utils/date.ts
export const toYmd = (s: string | Date) => {
  const d = typeof s === 'string' ? new Date(s) : s
  if (Number.isNaN(d.getTime())) return ''
  return d.toISOString().split('T')[0]
}