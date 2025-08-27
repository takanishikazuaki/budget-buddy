<template>
  <n-form-item :label="label" :path="path">
    <n-switch v-model:value="inner" :disabled="disabled" v-bind="$attrs" />
  </n-form-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NFormItem, NSwitch } from 'naive-ui'
defineOptions({ name: 'AppSwitch', inheritAttrs: false })

const props = withDefaults(defineProps<{
  modelValue: boolean
  label?: string
  path?: string
  disabled?: boolean
}>(), { disabled: false })

const emit = defineEmits<{ (e:'update:modelValue', v:boolean): void }>()
const inner = computed({ get: () => props.modelValue, set: v => emit('update:modelValue', v) })
</script>