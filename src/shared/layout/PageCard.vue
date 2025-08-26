<template>
  <n-card
    :bordered="bordered"
    :embedded="embedded"
    :segmented="segmented"
    class="mx-auto"
    :class="[maxWidth, shadow ? 'shadow-md' : '']"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <slot name="icon" />
          <div>
            <div class="font-medium">{{ title }}</div>
            <div v-if="subtitle" class="text-sm text-gray-500">{{ subtitle }}</div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <slot name="actions" />
        </div>
      </div>
    </template>

    <slot />

    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </n-card>
</template>

<script setup lang="ts">
import { NCard } from 'naive-ui'

type Segmented =
  | boolean
  | { content?: boolean; footer?: boolean; action?: boolean }

const props = withDefaults(defineProps<{
  title: string
  subtitle?: string
  maxWidth?: string     // Tailwindクラス: 'max-w-md' など
  shadow?: boolean
  bordered?: boolean
  embedded?: boolean
  segmented?: Segmented
}>(), {
  maxWidth: 'max-w-md',
  shadow: true,
  bordered: false,
  embedded: true,
  segmented: () => ({ content: true, footer: true })
})
</script>
