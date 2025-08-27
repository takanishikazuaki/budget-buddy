<template>
  <n-list bordered>
    <TemplateListItem
      v-for="t in templates"
      :key="t.id"
      :id="t.id"
      :name="t.name"
      :amount="t.amount"
      :memo="t.memo"
      :categoryName="catName(t.categoryId)"
      :cardName="cardName(t.cardId)"
      @delete="$emit('delete', t.id)"
    />
  </n-list>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NList } from 'naive-ui'
import TemplateListItem from './TemplateListItem.vue'

type RefData = { id: number|string; name: string }
const props = defineProps<{
  templates: Array<{ id: string|number; name: string; amount: number; memo: string; cardId: number|string; categoryId: number|string }>
  categories: RefData[]
  cards: RefData[]
}>()
defineEmits<{ (e:'delete', id: string|number): void }>()

const catMap = computed(() => new Map(props.categories.map(c => [String(c.id), c.name])))
const cardMap = computed(() => new Map(props.cards.map(c => [String(c.id), c.name])))
const catName  = (id: number|string) => catMap.value.get(String(id)) ?? ''
const cardName = (id: number|string) => cardMap.value.get(String(id)) ?? ''
</script>