<template>
  <n-form-item :label="label" :path="path">
    <n-radio-group v-model:value="inner">
      <template v-if="button">
        <n-space>
          <n-radio-button v-for="opt in options" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </n-radio-button>
        </n-space>
      </template>
      <template v-else>
        <n-space vertical>
          <n-radio v-for="opt in options" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </n-radio>
        </n-space>
      </template>
    </n-radio-group>
  </n-form-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NFormItem, NRadioGroup, NRadio, NRadioButton, NSpace } from 'naive-ui'
defineOptions({ name: 'AppRadioGroup' })

type Option = { label: string; value: number|string }

const props = withDefaults(defineProps<{
  modelValue: number|string|null
  options: Option[]
  label?: string
  path?: string
  button?: boolean
}>(), { button: false })

const emit = defineEmits<{ (e:'update:modelValue', v:number|string|null): void }>()
const inner = computed({ get: () => props.modelValue, set: v => emit('update:modelValue', v) })
</script>