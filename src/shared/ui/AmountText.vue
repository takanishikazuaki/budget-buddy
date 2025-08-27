<template>
  <span :class="klass">{{ formatted }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(defineProps<{
  amount: number
  currency?: string
  locale?: string
}>(), { currency: 'JPY', locale: 'ja-JP' })

const formatted = computed(() =>
  new Intl.NumberFormat(props.locale, { style: 'currency', currency: props.currency })
    .format(props.amount)
)
const klass = computed(() =>
  props.amount < 0 ? 'text-red-600' : props.amount > 0 ? 'text-green-600' : 'text-gray-500'
)
</script>