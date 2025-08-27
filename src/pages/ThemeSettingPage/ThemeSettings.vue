<!-- src/pages/ThemeSettings.vue -->
<template>
  <PageCard title="テーマ設定" subtitle="アプリ全体のプライマリカラーを変更">
    <AppRadioGroup
      v-model="selectedKey"
      :options="options"
      :button="true"
      label="テーマカラー"
      path="theme"
      class="mb-4"
    />

    <div v-if="selectedKey === 'custom'" class="mt-2">
      <AppColorPicker v-model="customHex" label="カスタム色" path="customColor" />
      <div class="text-xs text-gray-500 mt-2">※ 任意の色を選ぶと即時適用されます</div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import PageCard from '../../shared/layout/PageCard.vue'
import AppRadioGroup from '../../shared/form/AppRadioGroup.vue'
import AppColorPicker from '../../shared/form/AppColorPicker.vue'
import { useTheme } from '../../features/ThemeComponents/useTheme'

const { selectedKey, setByKey, applyPrimary } = useTheme()

// 表示用オプション
const options = [
  { label: '任天堂レッド', value: 'red' },
  { label: 'ブルー',       value: 'blue' },
  { label: 'グリーン',     value: 'green' },
  { label: 'カスタム',     value: 'custom' },
] as const

// カスタム色の一時保持
const customHex = ref('#e60012')

// プリセット選択時は setByKey、カスタム選択時は picker の変更で即適用
watch(selectedKey, (k) => {
  if (k === 'custom') {
    applyPrimary(customHex.value)
  } else {
    setByKey(k as 'red'|'blue'|'green')
  }
})
watch(customHex, (hex) => {
  if (selectedKey.value === 'custom') applyPrimary(hex)
})
</script>