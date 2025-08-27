<template>
  <n-list-item class="flex items-center gap-3">
    <span class="inline-block rounded-full" :style="{ backgroundColor: color, width: '20px', height: '20px' }" />
    <div class="flex-1">{{ name }}</div>
    <div class="text-xs text-gray-400 select-all">{{ id }}</div>
  </n-list-item>
</template>

<script setup lang="ts">
import { NListItem } from 'naive-ui'
defineProps<{ id: string|number; name: string; color: string }>()
</script>