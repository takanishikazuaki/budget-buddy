<template>
  <n-data-table :columns="columns" :data="rows" :bordered="true" size="small" />
</template>

<script setup lang="ts">
import { h } from 'vue'
import { NDataTable } from 'naive-ui'
import type { PreviewRow } from './usePayPayCsvImport'

defineProps<{ rows: PreviewRow[] }>()

const columns = [
  { title: '日付', key: 'date' },
  { title: '金額', key: 'amount', render: (r: PreviewRow) => `¥${r.amount.toLocaleString('ja-JP')}` },
  { title: 'メモ', key: 'memo' }
]
</script>