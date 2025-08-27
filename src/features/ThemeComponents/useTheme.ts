// src/features/theme/useTheme.ts
import { inject, onMounted, ref } from 'vue'
import type { GlobalThemeOverrides } from 'naive-ui'

const STORAGE_KEY = 'app.theme.primary'

export function useTheme() {
  const naiveTheme = inject<GlobalThemeOverrides>('naiveTheme')!
  const selectedKey = ref<'red'|'blue'|'green'|'custom'>('red')

  // プリセット色
  const themeMap = {
    red:   '#e60012', // 任天堂レッド
    blue:  '#007bff',
    green: '#28a745',
  } as const

  function applyPrimary(hex: string) {
    if (!naiveTheme) return
    // 既存値を保ちながら primary 系だけ更新
    naiveTheme.common = {
      ...(naiveTheme.common ?? {}),
      primaryColor: hex,
      primaryColorHover: hex,
      primaryColorPressed: hex,
      primaryColorSuppl: hex,
    }
    naiveTheme.Button = {
      ...(naiveTheme.Button ?? {}),
      colorPrimary: hex,
      colorPrimaryHover: hex,
      colorPrimaryPressed: hex,
      textColorPrimary: '#ffffff',
    }
    localStorage.setItem(STORAGE_KEY, hex)
  }

  function setByKey(key: 'red'|'blue'|'green'|'custom', customHex?: string) {
    selectedKey.value = key
    const hex = key === 'custom' ? (customHex ?? themeMap.red) : themeMap[key]
    applyPrimary(hex)
  }

  onMounted(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      applyPrimary(saved)
      const found = (Object.entries(themeMap) as Array<[typeof selectedKey.value, string]>)
        .find(([, v]) => v.toLowerCase() === saved.toLowerCase())
      selectedKey.value = found?.[0] ?? 'custom'
    } else {
      setByKey('red')
    }
  })

  return { selectedKey, themeMap, setByKey, applyPrimary }
}