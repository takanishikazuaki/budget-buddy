<template>
  <n-form @submit.prevent="onSubmit" label-placement="top" size="medium">
    <AppInput v-model="name" label="カテゴリー名" path="name" placeholder="カテゴリー名を入力" />
    <AppColorPicker v-model="color" label="色" path="color" style="width: 140px" />
    <FormActions>
      <AsyncButton :onClick="onSubmit">追加</AsyncButton>
    </FormActions>
  </n-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NForm } from 'naive-ui'
import AppInput from '../../shared/form/AppInput.vue'
import AppColorPicker from '../../shared/form/AppColorPicker.vue'
import AsyncButton from '../../shared/ui/AsyncButton.vue'
import FormActions from '../../shared/layout/FormActions.vue'

const emit = defineEmits<{ (e:'submit', payload: { name: string, color: string }): void }>()
const name = ref('')
const color = ref('#ff0000')

async function onSubmit() {
  if (!name.value.trim()) return
  await emit('submit', { name: name.value.trim(), color: color.value })
  name.value = ''
  color.value = '#ff0000'
}
</script>