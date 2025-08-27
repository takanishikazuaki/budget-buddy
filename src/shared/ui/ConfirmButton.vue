<template>
  <n-popconfirm
    :negative-text="cancelText"
    :positive-text="okText"
    @positive-click="onConfirm"
  >
    <template #trigger>
      <AppButton :type="type" :size="size" :block="block"><slot/></AppButton>
    </template>
    {{ message }}
  </n-popconfirm>
</template>

<script setup lang="ts">
import { NPopconfirm } from 'naive-ui'
import AppButton from './AppButton.vue'
defineOptions({ name: 'ConfirmButton' })

const props = withDefaults(defineProps<{
  message: string
  onConfirm: () => void | Promise<void>
  type?: 'primary'|'default'|'warning'|'error'|'success'
  size?: 'small'|'medium'|'large'
  block?: boolean
  okText?: string
  cancelText?: string
}>(), { type: 'warning', size: 'medium', block: false, okText: 'OK', cancelText: 'キャンセル' })
</script>