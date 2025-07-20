<template>
  <n-config-provider :theme-overrides="naiveTheme">
    <div class="min-h-screen flex flex-col bg-[#fdfdfd] font-['M_PLUS_Rounded_1c'] text-gray-900">
      <header :style="{ backgroundColor: naiveTheme.common?.primaryColor || '#e60012' }" 
              class="text-white py-4 px-6 text-2xl font-bold shadow-md rounded-b-lg">
        キャッシュレス決済家計簿
      </header>


      <HeaderNav />

      <main class="flex-grow px-4 pt-4 max-w-3xl mx-auto w-full">
        <n-message-provider>
          <RouterView />
        </n-message-provider>
      </main>

      <FooterTab />
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">
import { reactive, provide } from 'vue'
import HeaderNav from './components/HeaderNav.vue'
import FooterTab from './components/FooterTab.vue'
import type { GlobalThemeOverrides } from 'naive-ui'

const naiveTheme = reactive<GlobalThemeOverrides>({
  common: {
    primaryColor: '#e60012',
  },
  Button: {
    colorPrimary: '#e60012',
    textColorPrimary: '#fff',
  }
})

provide('naiveTheme', naiveTheme)
</script>
