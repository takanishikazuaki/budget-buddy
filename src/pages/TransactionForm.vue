<template>
  <div class="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
    <h2 class="text-2xl font-bold">手入力で支出を追加</h2>

    <form @submit.prevent="submitTransaction" class="space-y-4">
      <div>
        <label class="block text-sm font-medium">日付</label>
        <input type="date" v-model="form.date" class="input" required />
      </div>

      <div>
        <label class="block text-sm font-medium">金額</label>
        <input type="number" v-model.number="form.amount" class="input" required />
      </div>

      <div>
        <label class="block text-sm font-medium">メモ</label>
        <input type="text" v-model="form.memo" class="input" placeholder="例: コンビニ" />
      </div>

      <div>
        <label class="block text-sm font-medium">使用カード</label>
        <select v-model="form.cardId" class="input" required>
          <option disabled value="">カードを選択</option>
          <option v-for="card in cardStore.cards" :key="card.id" :value="card.id">
            {{ card.name }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium">カテゴリ</label>
        <select v-model="form.categoryId" class="input" required>
          <option disabled value="">カテゴリを選択</option>
          <option v-for="cat in categoryStore.categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <button type="submit" class="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        登録する
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTransactionStore } from '../stores/transactionStore'
import { useCardStore } from '../stores/cardStore'
import { useCategoryStore } from '../stores/categoryStore'

const transactionStore = useTransactionStore()
const cardStore = useCardStore()
const categoryStore = useCategoryStore()

const form = ref({
  date: '',
  amount: 0,
  memo: '',
  cardId: '',
  categoryId: ''
})

function submitTransaction() {
  transactionStore.addTransaction({
    id: crypto.randomUUID(),
    date: form.value.date,
    amount: form.value.amount,
    memo: form.value.memo,
    cardId: form.value.cardId,
    categoryId: form.value.categoryId
  })

  form.value = {
    date: '',
    amount: 0,
    memo: '',
    cardId: '',
    categoryId: ''
  }

  alert('登録が完了しました')
}
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.375rem;
  font-size: 1rem;
}
</style>
