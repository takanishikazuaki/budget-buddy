<template>
  <n-button
    :type="type"
    :size="size"
    :block="block"
    :circle="circle"
    :loading="loading"
    :disabled="disabled || loading"
    :attr-type="attrType"
  >
    <slot />
  </n-button>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'

withDefaults(defineProps<{
  type?: 'primary'|'default'|'warning'|'error'|'success'
  size?: 'small'|'medium'|'large'
  block?: boolean
  circle?: boolean
  loading?: boolean
  disabled?: boolean
  attrType?: 'button'|'submit'|'reset'
}>(), {
  type: 'primary',
  size: 'large',
  block: true,
  circle: false,
  loading: false,
  disabled: false,
  attrType: 'button'     // ← これでフォーム内「勝手にsubmit」を防げる
})
</script>
