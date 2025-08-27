<template>
  <n-list-item class="flex justify-between items-center">
    <div>
      <div class="font-bold">{{ name }}</div>
      <div class="text-sm text-gray-500">
        <AmountText :amount="amount" /> / {{ memo || 'メモなし' }}
        <span v-if="categoryName" class="ml-2 n-tag n-tag--info n-tag--tiny">{{ categoryName }}</span>
        <span v-if="cardName" class="ml-1 n-tag n-tag--warning n-tag--tiny">{{ cardName }}</span>
      </div>
    </div>
    <ConfirmButton type="error" size="small" :block="false"
      message="削除しますか？" :onConfirm="() => $emit('delete', id)">削除</ConfirmButton>
  </n-list-item>
</template>

<script setup lang="ts">
import { NListItem } from 'naive-ui'
import AmountText from '../../shared/ui/AmountText.vue'
import ConfirmButton from '../../shared/ui/ConfirmButton.vue'

defineProps<{
  id: string | number
  name: string
  amount: number
  memo: string
  categoryName?: string
  cardName?: string
}>()

defineEmits<{ (e:'delete', id: string|number): void }>()
</script>