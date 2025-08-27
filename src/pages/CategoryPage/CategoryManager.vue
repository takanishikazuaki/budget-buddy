<template>
  <div>
    <h2 class="mb-4 text-lg font-semibold">カテゴリーの管理</h2>

    <CategoryForm @submit="create" />

    <div class="mt-6">
      <h3 class="mb-2 text-md font-medium">登録済み</h3>
      <CategoryList :categories="categoryStore.categories" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCategoryStore } from '../../stores/categoryStore'
import CategoryForm from '../../features/CategoryComponents/CategoryForm.vue'
import CategoryList from '../../features/CategoryComponents/CategoryList.vue'

const categoryStore = useCategoryStore()

onMounted(() => { categoryStore.loadCategories?.() })

async function create(payload: { name: string; color: string }) {
  await categoryStore.addCategory(payload)
}
</script>