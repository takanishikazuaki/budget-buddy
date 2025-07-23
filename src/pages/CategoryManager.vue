<template>
  <div>
    <h2>カテゴリーの管理</h2>
    <form @submit.prevent="addCategory">
      <div>
        <label>カテゴリー名</label>
        <input v-model="newCategoryName" type="text">
      </div>
      <div class="mt-2">
        <label>色</label>
        <input v-model="newCategoryColor" type="color" class="w-12 h-8 p-0 border-none cursor-pointer">
      </div>
      <button type="submit" class="mt-2">追加</button>
    </form>

    <div class="mt-6">
      <h3>登録済み</h3>
      <ul>
        <li
          v-for="category in categoryStore.categories"
          :key="category.id"
          class="flex items-center gap-2"
        >
          <span
            class="inline-block w-4 h-4 rounded-full"
            :style="{ backgroundColor: category.color }"
          ></span>
          {{ category.name }}
          <span class="text-sm text-gray-400">({{ category.id }})</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCategoryStore } from '../stores/categoryStore'
import { nanoid } from 'nanoid'
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()
const newCategoryName = ref('')
const newCategoryColor = ref('#ff0000') // デフォルト色

onMounted(() => {
  categoryStore.loadCategories()
})

async function addCategory() {
  if (!newCategoryName.value.trim()) return

  await categoryStore.addCategory({
    name: newCategoryName.value.trim(),
    color: newCategoryColor.value
  })

  newCategoryName.value = ''
  newCategoryColor.value = '#ff0000'
}

</script>
