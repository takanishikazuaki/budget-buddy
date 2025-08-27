import { computed } from 'vue'
import { useTransactionStore } from '../stores/transactionStore'
import { useCategoryStore } from '../stores/categoryStore'
import { useCardStore } from '../stores/cardStore'
import { useMonthStore } from '../stores/useMonthStore'
import { toYmd } from "../shared/utils/date";

export function useTransactionGrouping() {
  const tx = useTransactionStore()
  const cat = useCategoryStore()
  const card = useCardStore()
  const month = useMonthStore()

  const dailyTotals = computed(() => {
    const map: Record<string, number> = {}
    for (const t of tx.transactions) {
      const d = new Date(t.date)
      if (d.getFullYear() === month.year && d.getMonth() === month.month) {
        const key = toYmd(t.date)
        map[key] = (map[key] ?? 0) + t.amount
      }
    }
    return map
  })

  const grouped = computed(() => {
    const map: Record<string, any[]> = {}
    for (const t of tx.transactions) {
      const d = new Date(t.date)
      if (d.getFullYear() !== month.year || d.getMonth() !== month.month) continue
      const key = toYmd(t.date)
      const category = cat.categories.find(c => c.id === t.categoryId)
      const ccard = card.cards.find(c => c.id === t.cardId)
      ;(map[key] ??= []).push({
        ...t,
        categoryName: category?.name ?? '',
        cardName: ccard?.name ?? '',
        time: formatTimeHm(t.date),
      })
    }
    return Object.fromEntries(Object.entries(map).sort((a, b) => b[0].localeCompare(a[0])))
  })

  return { dailyTotals, grouped }
}