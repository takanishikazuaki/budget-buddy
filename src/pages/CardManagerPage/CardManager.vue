<template>
  <div>
    <h2 class="mb-4 text-lg font-semibold">カードの管理</h2>

    <CardForm @submit="create" />

    <div class="mt-6">
      <h3 class="mb-2 text-md font-medium">登録済みカード</h3>
      <CardList :cards="cardStore.cards" @delete="remove" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCardStore } from '../../stores/cardStore'
import CardForm from '../../features/CardManagerComponents/CardForm.vue'
import CardList from '../../features/CardManagerComponents/CardList.vue'

const cardStore = useCardStore()

onMounted(() => { cardStore.loadCards?.() })

async function create(payload: { name: string }) {
  await cardStore.addCard(payload)
}
async function remove(id: string|number) {
  await cardStore.removeCard(String(id)) // ストアが string なら合わせる
}
</script>