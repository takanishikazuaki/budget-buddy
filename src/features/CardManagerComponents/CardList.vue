<template>
  <n-list bordered>
    <template v-if="cards.length">
      <CardListItem
        v-for="c in cards"
        :key="c.id"
        :id="c.id"
        :name="c.name"
        @delete="$emit('delete', c.id)"
      />
    </template>
    <template v-else>
      <EmptyState>カードがありません</EmptyState>
    </template>
  </n-list>
</template>

<script setup lang="ts">
import { NList } from 'naive-ui'
import CardListItem from './CardListItem.vue'
import EmptyState from '../../shared/ui/EmptyState.vue'

defineProps<{ cards: Array<{ id: string|number; name: string }> }>()
defineEmits<{ (e:'delete', id: string|number): void }>()
</script>