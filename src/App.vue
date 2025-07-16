<!-- <template>
  <header class="text-center py-2 font-bold text-lg bg-gray-200">
    キャッシュレス決済家計簿
  </header>

  <HeaderNav />

  <main class="flex-grow pb-16">
    <RouterView />
  </main>

  <FooterTab />
</template>

<script setup lang="ts">
import HeaderNav from './components/HeaderNav.vue'
import FooterTab from './components/FooterTab.vue'
</script> -->
<!-- App.vue -->
<template>
  <n-message-provider>
    <div class="min-h-screen bg-gray-100 p-8 space-y-4">
      <n-button type="primary">Primary</n-button>
      <n-button type="info">Info</n-button>
      <n-button type="success">Success</n-button>
      <n-button type="warning">Warning</n-button>
      <n-button type="error">Error</n-button>

      <n-input placeholder="名前を入力してください" />

      <n-select
        v-model:value="selected"
        :options="[
          { label: 'Vue', value: 'vue' },
          { label: 'React', value: 'react' },
          { label: 'Svelte', value: 'svelte' }
        ]"
        placeholder="好きなフレームワーク"
      />

      <n-switch v-model:value="isOn" />

      <n-button @click="showMessage">メッセージ表示</n-button>
    </div>
  </n-message-provider>
</template>

<script setup>
import { ref } from 'vue'
import {
  NButton,
  NInput,
  NSelect,
  NSwitch,
  useMessage,
  NMessageProvider
} from 'naive-ui'

const selected = ref(null)
const isOn = ref(false)
const message = useMessage()

function showMessage() {
  message.success('これは Naive UI のメッセージです！')
}
</script>
