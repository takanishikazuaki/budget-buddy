<template>
  <n-list-item class="flex justify-between items-center">
    <span class="truncate">{{ name }}</span>
    <ConfirmButton
      type="error" size="small" :block="false"
      message="削除しますか？"
      :onConfirm="() => $emit('delete', id)"
    >削除</ConfirmButton>
  </n-list-item>
</template>

<script setup lang="ts">
import { NListItem } from 'naive-ui'
import ConfirmButton from '../../shared/ui/ConfirmButton.vue'

defineProps<{ id: string|number; name: string }>()
defineEmits<{ (e:'delete', id: string|number): void }>()
</script>