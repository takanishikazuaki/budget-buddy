<template>
  <div class="sticky top-0 z-50 bg-white border-b shadow-sm px-4 py-2 flex items-center justify-between">
    <button @click="monthStore.prevMonth" class="text-xl">◀</button>

    <div class="text-lg font-semibold">
      {{ monthStore.year }}年{{ monthStore.month + 1 }}月
    </div>

    <div class="flex items-center gap-2">
      <!-- 設定アイコン -->
      <button @click="showSettings = true" class="text-xl">☰</button>
    </div>

    <!-- 設定画面（Settings.vue を使用） -->
    <Settings :show="showSettings" @update:show="showSettings = $event" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMonthStore } from '../stores/useMonthStore'
import Settings from '../pages/Settings.vue'

const monthStore = useMonthStore()
const showSettings = ref(false)
</script>
