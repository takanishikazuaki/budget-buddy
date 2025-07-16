<template>
  <div class="sticky top-0 z-50 bg-white border-b shadow-sm px-4 py-2 flex items-center justify-between">
    <button @click="monthStore.prevMonth" class="text-xl">◀</button>
    <div class="text-lg font-semibold">
      {{ monthStore.year }}年{{ monthStore.month + 1 }}月
    </div>
    <button @click="monthStore.nextMonth" class="text-xl">▶</button>
    <n-button>なんだかんだ</n-button>
  </div>
</template>

<script setup lang="ts">
import { useMonthStore } from '../stores/useMonthStore'
import { NButton } from 'naive-ui';
const monthStore = useMonthStore()
</script>
