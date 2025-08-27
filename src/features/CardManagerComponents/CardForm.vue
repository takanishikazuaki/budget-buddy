<template>
  <n-form @submit.prevent="onSubmit" label-placement="top">
    <AppInput v-model="name" label="カード名" path="name" placeholder="カード名を入力" />
    <FormActions>
      <AsyncButton :onClick="onSubmit">追加</AsyncButton>
    </FormActions>
  </n-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NForm } from 'naive-ui'
import AppInput from '../../shared/form/AppInput.vue'
import AsyncButton from '../../shared/ui/AsyncButton.vue'
import FormActions from '../../shared/layout/FormActions.vue'

const emit = defineEmits<{ (e:'submit', payload:{ name:string }): void }>()
const name = ref('')

async function onSubmit() {
  if (!name.value.trim()) return
  emit('submit', { name: name.value.trim() })
  name.value = ''
}
</script>