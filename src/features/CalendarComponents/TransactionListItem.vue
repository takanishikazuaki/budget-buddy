<template>
  <n-list-item class="cursor-pointer flex justify-between items-center hover:bg-gray-50" @click="$emit('click')">
    <div>
      <div class="font-semibold">{{ memo || 'メモなし' }}</div>
      <div class="text-sm text-gray-600 mt-1 flex gap-1">
        <n-tag type="info" size="small">{{ categoryName }}</n-tag>
        <n-tag type="warning" size="small">{{ cardName }}</n-tag>
      </div>
      <div class="text-xs text-gray-400 mt-1">{{ time }}</div>
    </div>
    <div class="font-bold text-right">
      <AmountText :amount="amount" />
    </div>
  </n-list-item>
</template>

<script setup lang="ts">
import { NListItem, NTag } from 'naive-ui'
import AmountText from '../../shared/ui/AmountText.vue'
defineProps<{ memo: string; time: string; amount: number; categoryName: string; cardName: string }>()
defineEmits<{ (e:'click'): void }>()
</script>