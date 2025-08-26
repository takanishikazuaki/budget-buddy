<template>
  <n-form-item :label="label" :path="path">
    <n-select
      v-model:value="inner"
      :options="options"
      :placeholder="placeholder"
      :clearable="clearable"
      :filterable="filterable"
      :disabled="disabled"
      v-bind="$attrs"
    />
  </n-form-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NFormItem, NSelect } from 'naive-ui'

// ルートは n-form-item。attrs を n-select に渡したいので明示的にバインド
defineOptions({ name: 'AppSelect', inheritAttrs: false })

type Option = { label: string; value: number | string }

const props = withDefaults(defineProps<{
  modelValue: number | string | null
  options: Option[]
  label?: string
  path?: string          // Naive のバリデーション用フィールド名
  placeholder?: string
  clearable?: boolean
  filterable?: boolean
  disabled?: boolean
}>(), {
  clearable: true,
  filterable: true,
  disabled: false
})

const emit = defineEmits<{ (e:'update:modelValue', v:number|string|null): void }>()

// v-model (modelValue/update:modelValue) ←→ n-select (value/update:value) を橋渡し
const inner = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})
</script>
