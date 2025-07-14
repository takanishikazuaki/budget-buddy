<template>
  <div class="p-4 max-w-md mx-auto">
    <h2 class="text-xl font-semibold mb-4">カードの管理</h2>

    <form @submit.prevent="addCard" class="space-y-4">
      <div>
        <label class="block text-sm font-medium">カード名</label>
        <input v-model="newCardName" type="text" class="border px-2 py-1 w-full" />
      </div>

      <button type="submit" class="bg-blue-500 text-white px-4 py-1 rounded">
        追加
      </button>
    </form>

    <div class="mt-6">
      <h3 class="text-lg font-medium">登録済みカード</h3>
      <ul class="list-disc pl-5 mt-2">
        <li v-for="card in cardStore.cards" :key="card.id">
          {{ card.name }} <span class="text-sm text-gray-400">({{ card.id }})</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCardStore } from '../stores/cardStore'
import { nanoid } from 'nanoid'

const cardStore = useCardStore()
const newCardName = ref('')

function addCard() {
  if (!newCardName.value.trim()) return

  const newCard = {
    id: nanoid(6), // 簡易IDでOK
    name: newCardName.value.trim()
  }

  cardStore.addCard(newCard)
  newCardName.value = ''
}
</script>
