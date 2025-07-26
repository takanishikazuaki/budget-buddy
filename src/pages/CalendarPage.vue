<template>
  <div>
    <h2 class="text-xl font-bold mb-4">カレンダー</h2>
    <div v-if="isLoaded">
    <CalendarHeatMap :data="dailyTotals" :year="monthStore.year" :month="monthStore.month" />

      <!-- 取引リスト（アコーディオン形式） -->
      <div class="mt-8 max-w-3xl mx-auto">
        <h3 class="text-lg font-semibold mb-3">直近の取引一覧</h3>
        <n-collapse :default-expanded-names="[]" accordion>
          <template v-for="(txs, date) in groupedTransactions" :key="date">
            <n-collapse-item :title="`${date}（${txs.length}件）`" :name="date">
              <n-list bordered size="small">
                <n-list-item
                  v-for="tx in txs"
                  :key="tx.id"
                  class="cursor-pointer flex justify-between items-center hover:bg-gray-50"
                  @click="openEditModal(tx)"
                >
                  <div>
                    <div class="font-semibold">{{ tx.memo || 'メモなし' }}</div>
                    <div class="text-sm text-gray-600 mt-1">
                      <n-tag type="info" size="small" class="mr-1">{{ tx.categoryName }}</n-tag>
                      <n-tag type="warning" size="small">{{ tx.cardName }}</n-tag>
                    </div>
                    <div class="text-xs text-gray-400 mt-1">{{ formatTime(tx.date) }}</div>
                  </div>
                  <div :class="['font-bold text-right', tx.amount < 0 ? 'text-red-600' : 'text-green-600']">
                    ¥{{ tx.amount }}
                  </div>
                </n-list-item>
              </n-list>
            </n-collapse-item>
          </template>
        </n-collapse>
      </div>
    </div>
    <div v-else class="text-center py-10">読み込み中...</div>

    <!-- 編集モーダル -->
    <EditTransactionModal
      v-model:show="editModalVisible"
      :transaction="selectedTransaction"
      @saved="editModalVisible = false"
      @deleted="editModalVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { NList, NListItem } from 'naive-ui'
import CalendarHeatMap from '../components/CalendarHeatMap.vue'
import EditTransactionModal from '../components/EditTransactionModal.vue'

import { useTransactionStore } from '../stores/transactionStore'
import { useCategoryStore } from '../stores/categoryStore'
import { useCardStore } from '../stores/cardStore'
import { useMonthStore } from '../stores/useMonthStore'

import {
  NCollapse,
  NCollapseItem,
  NTag
} from 'naive-ui'


const transactionStore = useTransactionStore()
const categoryStore = useCategoryStore()
const cardStore = useCardStore()
const monthStore = useMonthStore()
const isLoaded = ref(false)

onMounted(async () => {
  await Promise.all([
    transactionStore.loadTransactions?.(),
    categoryStore.loadCategories?.(),
    cardStore.loadCards?.()
  ])
  isLoaded.value = true
})

function getDateKey(dateStr: string) {
  return new Date(dateStr).toISOString().split('T')[0]
}

function formatTime(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit'
  })
}


const dailyTotals = computed(() => {
  const map: Record<string, number> = {}

  for (const tx of transactionStore.transactions) {
    const date = new Date(tx.date)
    if (
      date.getFullYear() === monthStore.year &&
      date.getMonth() === monthStore.month
    ) {
      const key = getDateKey(tx.date)
      map[key] = (map[key] || 0) + tx.amount
    }
  }

  return map
})

const groupedTransactions = computed(() => {
  const map: Record<string, any[]> = {}

  for (const tx of transactionStore.transactions) {
    const date = new Date(tx.date)
    if (
      date.getFullYear() !== monthStore.year ||
      date.getMonth() !== monthStore.month
    ) continue

    const key = getDateKey(tx.date)

    const category = categoryStore.categories.find(c => c.id === tx.categoryId)
    const card = cardStore.cards.find(c => c.id === tx.cardId)

    if (!map[key]) map[key] = []

    map[key].push({
      ...tx,
      categoryName: category?.name || '',
      cardName: card?.name || ''
    })
  }

  return Object.fromEntries(
    Object.entries(map).sort((a, b) => b[0].localeCompare(a[0]))
  )
})

// モーダル管理
const editModalVisible = ref(false)
const selectedTransaction = ref<any>(null)

function openEditModal(tx: any) {
  selectedTransaction.value = tx
  editModalVisible.value = true
}
</script>
