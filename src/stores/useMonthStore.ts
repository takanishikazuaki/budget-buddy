import { defineStore } from 'pinia'

export const useMonthStore = defineStore('month', {
  state: () => ({
    current: new Date()  // 現在日付
  }),
  getters: {
    year: (state) => state.current.getFullYear(),
    month: (state) => state.current.getMonth()  // 0-based
  },
  actions: {
    nextMonth() {
      const date = new Date(this.current)
      date.setMonth(date.getMonth() + 1)
      this.current = date
    },
    prevMonth() {
      const date = new Date(this.current)
      date.setMonth(date.getMonth() - 1)
      this.current = date
    }
  }
})
