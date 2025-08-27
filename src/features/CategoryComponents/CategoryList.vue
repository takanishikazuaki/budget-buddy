<template>
  <n-list bordered size="medium" class="max-w-md">
    <CategoryListItem
      v-for="c in categories"
      :key="c.id"
      :id="c.id"
      :name="c.name"
      :color="c.color"
    />
  </n-list>
</template>

<script setup lang="ts">
import { NList } from 'naive-ui'
import CategoryListItem from './CategoryListItem.vue'
defineProps<{ categories: Array<{ id: string|number; name: string; color: string }> }>()
</script>