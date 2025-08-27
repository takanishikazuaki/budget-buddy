<template>
  <n-form-item :label="label" :path="path">
    <n-color-picker
      v-model:value="inner"
      :show-alpha="false"
      format="hex"
      v-bind="$attrs"
    />
  </n-form-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NFormItem, NColorPicker } from 'naive-ui'
defineOptions({ name: 'AppColorPicker', inheritAttrs: false })

const props = defineProps<{
  modelValue: string
  label?: string
  path?: string
}>()
const emit = defineEmits<{ (e:'update:modelValue', v:string): void }>()
const inner = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})
</script>