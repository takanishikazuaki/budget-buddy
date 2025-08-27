<template>
  <n-form @submit.prevent="onSubmit" label-placement="top">
    <AppInput   v-model="form.name"   label="テンプレート名" path="name"  placeholder="例：昼食（会社）" />
    <AppNumber  v-model="form.amount" label="金額"            path="amount" :min="0" />
    <AppInput   v-model="form.memo"   label="メモ"            path="memo"  placeholder="メモ（任意）" />

    <AppSelect  v-model="form.cardId"     :options="cardOptions"     label="カード"   path="cardId" />
    <AppSelect  v-model="form.categoryId" :options="categoryOptions" label="カテゴリ" path="categoryId" />

    <FormActions>
      <AsyncButton :onClick="onSubmit">＋ 登録する</AsyncButton>
    </FormActions>
  </n-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { NForm } from 'naive-ui'
import AppInput from '../../shared/form/AppInput.vue'
import AppNumber from '../../shared/form/AppNumber.vue'
import AppSelect from '../../shared/form/AppSelect.vue'
import AsyncButton from '../../shared/ui/AsyncButton.vue'
import FormActions from '../../shared/layout/FormActions.vue'

type Option = { label: string; value: number }

const props = defineProps<{
  cardOptions: Option[]
  categoryOptions: Option[]
}>()

const emit = defineEmits<{ (e:'submit', payload: {
  name: string; amount: number; memo: string;
  cardId: number; categoryId: number;
}): void }>()

const form = reactive({
  name: '', amount: null as number | null, memo: '',
  cardId: null as number | null, categoryId: null as number | null
})

async function onSubmit() {
  if (!form.name.trim() || form.amount == null || form.cardId == null || form.categoryId == null) return
  emit('submit', {
    name: form.name.trim(),
    amount: Number(form.amount),
    memo: form.memo || '',
    cardId: form.cardId,
    categoryId: form.categoryId
  })
  // reset
  form.name = ''; form.amount = null; form.memo = ''
  form.cardId = null; form.categoryId = null
}
</script>