<template>
  <n-layout-header class="sticky top-0 z-50 bg-white border-b shadow-sm px-4 py-2">
    <div class="flex items-center justify-between w-full">
      <div class="flex items-center gap-4">
        <n-button size="large" @click="monthStore.prevMonth" circle>◀</n-button>
        <div class="text-lg font-semibold">
          {{ monthStore.year }}年{{ monthStore.month + 1 }}月
        </div>
        <n-button size="large" @click="monthStore.nextMonth" circle>▶</n-button>
      </div>
      <n-button size="large" @click="showSettings = true" circle>☰</n-button>
    </div>

    <!-- Settingsはheaderの外側でもOK -->
    <Settings :show="showSettings" @update:show="showSettings = $event" />
  </n-layout-header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMonthStore } from '../stores/useMonthStore'
import Settings from '../pages/Settings.vue'
import { NButton, NLayoutHeader } from 'naive-ui'

const monthStore = useMonthStore()
const showSettings = ref(false)
</script>
