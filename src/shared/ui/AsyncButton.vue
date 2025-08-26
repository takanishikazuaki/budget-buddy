<template>
  <AppButton
    :type="type"
    :size="size"
    :block="block"
    :loading="busy"
    :disabled="disabled || busy"
    :attr-type="attrType"
    aria-busy="busy ? 'true' : 'false'"
    v-bind="$attrs"
    @click="run"
  >
    <slot />
  </AppButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppButton from './AppButton.vue'

const props = withDefaults(defineProps<{
  onClick: () => Promise<void> | void      // 実行したい処理
  type?: 'primary'|'default'|'warning'|'error'|'success'
  size?: 'small'|'medium'|'large'
  block?: boolean
  disabled?: boolean
  attrType?: 'button'|'submit'|'reset'     // フォーム中の誤submit防止
}>(), {
  type: 'primary',
  size: 'large',
  block: true,
  disabled: false,
  attrType: 'button'
})

const emit = defineEmits<{
  (e: 'success'): void
  (e: 'error', err: unknown): void
  (e: 'finally'): void
}>()

const busy = ref(false)

async function run() {
  if (busy.value) return
  busy.value = true
  try {
    await props.onClick()
    emit('success')
  } catch (err) {
    emit('error', err)
  } finally {
    busy.value = false
    emit('finally')
  }
}
</script>
