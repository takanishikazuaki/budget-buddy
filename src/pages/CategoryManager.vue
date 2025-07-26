<template>
  <div>
    <h2 class="mb-4 text-lg font-semibold">カテゴリーの管理</h2>
    <n-form @submit.prevent="addCategory" label-placement="top" size="medium">
      <n-form-item label="カテゴリー名" required>
        <n-input v-model:value="newCategoryName" placeholder="カテゴリー名を入力" />
      </n-form-item>

      <n-form-item label="色" required>
        <n-color-picker
        v-model:value="newCategoryColor"
        :showAlpha="false"
        format="hex"
        size="medium"
        :style="{ width: '100px' }"
        />
      </n-form-item>

      <n-form-item>
       <n-button type="primary" block @click="addCategory">追加</n-button>
      </n-form-item>
    </n-form>

    <div class="mt-6">
      <h3 class="mb-2 text-md font-medium">登録済み</h3>
      <n-list bordered size="medium" class="max-w-md">
        <n-list-item
          v-for="category in categoryStore.categories"
          :key="category.id"
          class="flex items-center gap-3"
        >
          <div
            class="inline-block rounded-full"
            :style="{ backgroundColor: category.color, width: '20px', height: '20px' }"
          ></div>
          <div class="flex-1">
            {{ category.name }}
          </div>
          <div class="text-xs text-gray-400 select-all">
            {{ category.id }}
          </div>
        </n-list-item>
      </n-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCategoryStore } from '../stores/categoryStore'
import { NForm, NFormItem, NInput, NButton, NColorPicker, NList, NListItem } from 'naive-ui'

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
