<template>
  <n-config-provider :theme-overrides="naiveTheme">
    <div class="min-h-screen flex flex-col bg-[#fdfdfd] font-['M_PLUS_Rounded_1c'] text-gray-900">
      <header class="bg-[#e60012] text-white py-4 px-6 text-2xl font-bold shadow-md rounded-b-lg">
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
import HeaderNav from './components/HeaderNav.vue'
import FooterTab from './components/FooterTab.vue'
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'

const naiveTheme: GlobalThemeOverrides = {
  common: {
    primaryColor: '#e60012',
    primaryColorHover: '#cc0010',
    primaryColorPressed: '#b3000f',
    primaryColorSuppl: '#e60012',
    baseColor: '#fdfdfd',
    borderRadius: '12px',
    fontWeightStrong: '600',
  },
  Button: {
    colorPrimary: '#e60012',
    colorPrimaryHover: '#cc0010',
    colorPrimaryPressed: '#b3000f',
    textColorPrimary: '#ffffff',
    borderRadius: '9999px', // pill型
  },
  Input: {
    borderRadius: '10px',
    caretColor: '#e60012',
    borderColorFocus: '#e60012',
  },
  Card: {
    color: '#ffffff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    borderRadius: '16px',
  },
  Tabs: {
    tabTextColorActiveLine: '#e60012',
    tabTextColorActiveBar: '#e60012'
  },
  Message: {
    colorInfo: '#e60012',
  }
}


</script>
