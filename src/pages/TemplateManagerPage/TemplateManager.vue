<template>
  <n-space vertical size="large">
    <TemplateForm
      :card-options="cardOptions"
      :category-options="categoryOptions"
      @submit="createTemplate"
    />

    <n-divider>登録済みテンプレート</n-divider>

    <TemplateList
      :templates="templateStore.templates"
      :categories="categoryStore.categories"
      :cards="cardStore.cards"
      @delete="templateStore.deleteTemplate"
    />
  </n-space>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { NSpace, NDivider } from 'naive-ui'
import TemplateForm from '../../features/TemplateComponents/TemplateForm.vue'
import TemplateList from '../../features/TemplateComponents/TemplateList.vue'

import { useTemplateStore } from '../../stores/templateStore'
import { useCardStore } from '../../stores/cardStore'
import { useCategoryStore } from '../../stores/categoryStore'

const templateStore = useTemplateStore()
const cardStore = useCardStore()
const categoryStore = useCategoryStore()

onMounted(() => { templateStore.loadTemplates?.(); cardStore.loadCards?.(); categoryStore.loadCategories?.() })

// Optionは number に寄せる（文字なら Number(...) で吸収）
const cardOptions = computed(() =>
  cardStore.cards.map(c => ({ label: c.name, value: typeof c.id === 'string' ? Number(c.id) : c.id }))
)
const categoryOptions = computed(() =>
  categoryStore.categories.map(c => ({ label: c.name, value: typeof c.id === 'string' ? Number(c.id) : c.id }))
)

async function createTemplate(payload: {
  name: string; amount: number; memo: string; cardId: number; categoryId: number
}) {
  await templateStore.addTemplate(payload)
}
</script>