<template>
    <div>
        <h2>カテゴリーの管理</h2>
        <form @submit.prevent="addCategory">
            <div>
                <label>カテゴリー名</label>
                <input v-model="newCategoryName" type="text">
                <button type="submit">追加</button>
            </div>
        </form>
        <div>
            <h3>登録済み</h3>
            <ul>
                <li v-for="category in categoryStore.categories" :key="category.id">
                    {{ category.name }}<span class="text-sm text-gray-400">({{ category.id }})</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCategoryStore } from '../stores/categoryStore';
import { nanoid } from 'nanoid'

const categoryStore = useCategoryStore()
const newCategoryName = ref('')

function addCategory(){
    if(!newCategoryName.value.trim())return
    const newCategory = {
        id:nanoid(6),
        name: newCategoryName.value.trim()
    }

    categoryStore.addCategory(newCategory)
    newCategoryName.value = ''
}
</script>