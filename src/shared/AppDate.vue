<!-- AppDate.vue（修正版 / 文字列で運用） -->
<template>
  <n-form-item :label="label" :path="path">
    <n-date-picker
      v-model:formatted-value="inner"
      type="date"
      value-format="yyyy-MM-dd"
      :clearable="clearable"
      :disabled="disabled"
    />
  </n-form-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NFormItem, NDatePicker } from 'naive-ui'
defineOptions({ name: 'AppDate' })

const props = withDefaults(defineProps<{
  modelValue: string | null           // ← "YYYY-MM-DD" or null
  label?: string
  path?: string
  clearable?: boolean
  disabled?: boolean
}>(), { clearable: true, disabled: false })

const emit = defineEmits<{ (e:'update:modelValue', v:string|null): void }>()
const inner = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})
</script>
