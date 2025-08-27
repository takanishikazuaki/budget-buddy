<template>
  <n-form-item :label="label" :path="path">
    <n-input
      v-model:value="inner"
      :placeholder="placeholder"
      :type="type"
      :disabled="disabled"
      clearable
      v-bind="$attrs"
    />
  </n-form-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NFormItem, NInput } from 'naive-ui'
defineOptions({ name: 'AppInput', inheritAttrs: false })

const props = withDefaults(defineProps<{
  modelValue: string
  label?: string
  path?: string
  placeholder?: string
  type?: 'text'|'password'|'email'|'url'|'textarea'
  disabled?: boolean
}>(), { type: 'text', disabled: false })

const emit = defineEmits<{ (e:'update:modelValue', v:string): void }>()
const inner = computed({ get: () => props.modelValue, set: v => emit('update:modelValue', v) })
</script>