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
<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-2xl font-bold mb-4 text-blue-600">Naive UI + Tailwind テスト</h1>

    <!-- Naive UI ボタン -->
    <n-button type="primary" class="mr-4">Naive ボタン</n-button>

    <!-- Tailwind のみでスタイリングされたボタン -->
    <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
      Tailwind ボタン
    </button>
  </div>
</template>

<script setup>
import { NButton } from 'naive-ui'
</script>
