<template>
  <div>
    <h2 class="text-xl font-bold mb-4">カレンダー</h2>

    <div v-if="isLoaded">
      <CalendarHeatMap :data="dailyTotals" :year="monthStore.year" :month="monthStore.month" />

      <div class="mt-8 max-w-3xl mx-auto">
        <h3 class="text-lg font-semibold mb-3">直近の取引一覧</h3>
        <n-collapse accordion>
          <TransactionDayGroup
            v-for="(items, date) in grouped"
            :key="date"
            :date="date"
            :items="items"
            @edit="openEditModal"
          />
        </n-collapse>
      </div>
    </div>

    <EmptyState v-else>読み込み中...</EmptyState>

    <EditTransactionModal
      v-model:show="editModalVisible"
      :transaction="selectedTransaction"
      @saved="editModalVisible = false"
      @deleted="editModalVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NCollapse } from 'naive-ui'

import CalendarHeatMap from '../../components/CalendarHeatMap.vue'
import EditTransactionModal from '../../components/EditTransactionModal.vue'
import TransactionDayGroup from '../../features/CalendarComponents/TransactionDayGroup.vue'
import { useTransactionGrouping } from '../../composables/useTransactionGrouping'

import { useTransactionStore } from '../../stores/transactionStore'
import { useCategoryStore } from '../../stores/categoryStore'
import { useCardStore } from '../../stores/cardStore'
import { useMonthStore } from '../../stores/useMonthStore'

// import EmptyState from '../../shared/ui/EmptyState.vue'
// If EmptyState.vue exists at a different path, update the import accordingly, for example:
// import EmptyState from '../../components/EmptyState.vue'


const tx = useTransactionStore()
const cat = useCategoryStore()
const card = useCardStore()
const monthStore = useMonthStore()

const isLoaded = ref(false)
onMounted(async () => {
  await Promise.all([tx.loadTransactions?.(), cat.loadCategories?.(), card.loadCards?.()])
  isLoaded.value = true
})

const { dailyTotals, grouped } = useTransactionGrouping()

// モーダル
const editModalVisible = ref(false)
const selectedTransaction = ref<any>(null)
function openEditModal(t: any) { selectedTransaction.value = t; editModalVisible.value = true }
</script>