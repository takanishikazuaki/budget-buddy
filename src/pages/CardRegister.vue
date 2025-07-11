<template>
  <div>
    <h2 class="text-lg font-semibold mb-4">カード登録</h2>
    <form @submit.prevent="registerCard" class="space-y-2">
      <div>
        <label class="block text-sm">カード名</label>
        <input v-model="name" type="text" class="border px-2 py-1 w-full" required />
      </div>
      <button type="submit" class="px-4 py-1 bg-green-500 text-white rounded">
        登録
      </button>
    </form>

    <div v-if="cards.length" class="mt-6">
      <h3 class="text-sm font-semibold">登録済みカード一覧</h3>
      <ul class="list-disc ml-4">
        <li v-for="card in cards" :key="card.id">{{ card.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCardStore } from '../stores/cardStore'

const store = useCardStore()
const name = ref('')
const cards = store.cards

function registerCard() {
  if (!name.value.trim()) return
  store.addCard({ id: crypto.randomUUID(), name: name.value.trim() })
  name.value = ''
}
</script>
