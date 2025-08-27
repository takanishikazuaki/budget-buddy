<template>
  <n-form-item :label="label" :path="path">
    <n-input
      v-model:value="inner"
      type="textarea"
      :autosize="{ minRows, maxRows }"
      :placeholder="placeholder"
      :disabled="disabled"
      v-bind="$attrs"
    />
  </n-form-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NFormItem, NInput } from 'naive-ui'
defineOptions({ name: 'AppTextarea', inheritAttrs: false })

const props = withDefaults(defineProps<{
  modelValue: string
  label?: string
  path?: string
  placeholder?: string
  minRows?: number
  maxRows?: number
  disabled?: boolean
}>(), { minRows: 3, maxRows: 8, disabled: false })

const emit = defineEmits<{ (e:'update:modelValue', v:string): void }>()
const inner = computed({ get: () => props.modelValue, set: v => emit('update:modelValue', v) })
</script>