<template>
<n-drawer :show="show" @update:show="handleUpdateShow" placement="right" width="600">
  <n-drawer-content title="設定メニュー" closable style="height: 100%;">
    <n-tabs tab-placement="left" animated style="height: 100%;">
      <n-tab-pane name="categories" tab="カテゴリ管理">
        <CategoryManager />
      </n-tab-pane>
      <n-tab-pane name="cards" tab="カード管理">
        <CardManager />
      </n-tab-pane>
      <n-tab-pane name="theme" tab="テーマ設定">
        <ThemeSettings />
      </n-tab-pane>
      <n-tab-pane name="templates" tab="テンプレート管理">
        <TemplateManager />
      </n-tab-pane>
    </n-tabs>
  </n-drawer-content>
</n-drawer>

</template>


<script setup lang="ts">
import CategoryManager from './CategoryManager.vue'
import CardManager from './CardManager.vue'
import ThemeSettings from './ThemeSettings.vue'
import TemplateManager from './TemplateManager.vue' 

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const handleUpdateShow = (val: boolean) => {
  emit('update:show', val)
}
</script>
