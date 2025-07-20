<!-- src/pages/ThemeSettings.vue -->
<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">テーマ設定</h2>
    <n-radio-group v-model:value="selected" name="theme" @update:value="applyTheme">
      <n-radio-button value="red">任天堂レッド</n-radio-button>
      <n-radio-button value="blue">ブルー</n-radio-button>
      <n-radio-button value="green">グリーン</n-radio-button>
    </n-radio-group>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import type { GlobalThemeOverrides } from 'naive-ui'

const naiveTheme = inject<GlobalThemeOverrides>('naiveTheme')!
const selected = ref('red')

function applyTheme(color: string) {
  if (!naiveTheme || typeof naiveTheme !== 'object') return

  const themeMap: Record<string, string> = {
    red: '#e60012',
    blue: '#007bff',
    green: '#28a745'
  }

  const hex = themeMap[color]

  naiveTheme.common = {
    primaryColor: hex,
    primaryColorHover: hex,
    primaryColorPressed: hex,
    primaryColorSuppl: hex
  }

  naiveTheme.Button = {
    colorPrimary: hex,
    colorPrimaryHover: hex,
    colorPrimaryPressed: hex,
    textColorPrimary: '#ffffff'
  }
}
</script>
