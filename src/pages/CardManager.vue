<template>
  <div>
    <h2>カードの管理</h2>
    <n-form label-placement="top">
      <n-form-item label="カード名">
        <n-input v-model:value="newCardName" placeholder="カード名を入力" />
      </n-form-item>

      <n-form-item>
        <n-button type="primary" block @click="addCard">追加</n-button>
      </n-form-item>
    </n-form>

    <div class="mt-6">
      <h3>登録済みカード</h3>
      <n-list bordered>
        <n-list-item
          v-for="card in cardStore.cards"
          :key="card.id"
          class="flex justify-between items-center"
        >
          {{ card.name }}
          <n-button size="small" type="error" @click="deleteCard(card.id)">
            削除
          </n-button>
        </n-list-item>
      </n-list>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCardStore } from '../stores/cardStore'
import { NForm, NFormItem, NInput, NButton, NList, NListItem } from 'naive-ui'

const cardStore = useCardStore()

const newCardName = ref('')

onMounted(() => {
  cardStore.loadCards()
})

async function addCard() {
  if (!newCardName.value.trim()) return

  try {
    await cardStore.addCard({
      name: newCardName.value.trim()
    })
    newCardName.value = ''
  } catch (error) {
    console.error('カード追加失敗', error)
  }
}

async function deleteCard(id: string) {
  try {
    await cardStore.removeCard(id)
  } catch (error) {
    console.error('カード削除失敗', error)
  }
}
</script>
