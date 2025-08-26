<template>
  <n-form @submit.prevent="$emit('submit')" label-placement="top">
    <AppDate    v-model="model.date"       label="日付"      path="date" />
    <AppNumber  v-model="model.amount"     label="金額"      path="amount" :min="0" />
    <AppSelect  v-model="model.categoryId" :options="categoryOptions" label="カテゴリ"  path="categoryId" />
    <AppSelect  v-model="model.cardId"     :options="cardOptions"     label="使用カード" path="cardId" />
    <n-form-item label="メモ" path="memo"><n-input v-model:value="model.memo" clearable /></n-form-item>
    <AsyncButton :onClick="() => $emit('submit')">🎮 登録する</AsyncButton>
  </n-form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NForm, NFormItem, NInput } from 'naive-ui'
import AppDate from '../../shared/form/AppDate.vue'
import AppNumber from '../../shared/form/AppNumber.vue'
import AppSelect from '../../shared/form/AppSelect.vue'
import AsyncButton from '../../shared/ui/AsyncButton.vue'

type Option = { label: string; value: string }

const props = defineProps<{
  modelValue: { date: string|null; amount: number|null; memo: string; cardId: string|null; categoryId: string|null }
  categoryOptions: Option[]
  cardOptions: Option[]
}>()
const emit = defineEmits<{ (e:'update:modelValue', v: typeof props.modelValue): void; (e:'submit'): void }>()
const model = computed({ get: () => props.modelValue, set: v => emit('update:modelValue', v) })
</script>
