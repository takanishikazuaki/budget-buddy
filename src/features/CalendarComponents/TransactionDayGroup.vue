<template>
  <n-collapse-item :title="`${date}（${items.length}件）`" :name="date">
    <n-list bordered size="small">
      <TransactionListItem
        v-for="tx in items" :key="tx.id"
        :memo="tx.memo || 'メモなし'" :time="tx.time" :amount="tx.amount"
        :categoryName="tx.categoryName" :cardName="tx.cardName"
        @click="$emit('edit', tx)"
      />
    </n-list>
  </n-collapse-item>
</template>

<script setup lang="ts">
import { NCollapseItem, NList } from 'naive-ui'
import TransactionListItem from './TransactionListItem.vue'
defineProps<{ date: string; items: any[] }>()
defineEmits<{ (e:'edit', tx:any): void }>()
</script>