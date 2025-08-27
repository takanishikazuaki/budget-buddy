<template>
  <n-form-item :label="label" :path="path">
    <n-input-number
      v-model:value="inner"
      :min="min"
      :max="max"
      :step="step"
      :placeholder="placeholder"
      :clearable="clearable"
      :disabled="disabled"
      v-bind="$attrs"
    />
  </n-form-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NFormItem, NInputNumber } from 'naive-ui'

defineOptions({ name: 'AppNumber', inheritAttrs: false })

const props = withDefaults(defineProps<{
  modelValue: number | null
  label?: string
  path?: string
  min?: number
  max?: number
  step?: number
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
}>(), {
  min: 0,
  step: 1,
  clearable: true,
  disabled: false
})

const emit = defineEmits<{ (e:'update:modelValue', v:number|null): void }>()

const inner = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})
</script>
