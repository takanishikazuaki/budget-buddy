<template>
  <n-space vertical size="large">
    <n-form label-placement="top" @submit.prevent="addTemplate">
      <n-form-item label="テンプレート名">
        <n-input v-model:value="newTemplate.name" placeholder="例：昼食（会社）" />
      </n-form-item>

      <n-form-item label="金額">
        <n-input-number v-model:value="newTemplate.amount" :min="0" placeholder="例：800" />
      </n-form-item>

      <n-form-item label="メモ">
        <n-input v-model:value="newTemplate.memo" placeholder="メモ（任意）" />
      </n-form-item>

      <n-form-item label="カード">
        <n-select
          v-model:value="newTemplate.cardId"
          :options="cardOptions"
          placeholder="カードを選択"
        />
      </n-form-item>

      <n-form-item label="カテゴリ">
        <n-select
          v-model:value="newTemplate.categoryId"
          :options="categoryOptions"
          placeholder="カテゴリを選択"
        />
      </n-form-item>

      <n-button type="primary" block attr-type="submit">＋ 登録する</n-button>
    </n-form>

    <n-divider>登録済みテンプレート</n-divider>

    <n-list bordered>
      <n-list-item
        v-for="tpl in templateStore.templates"
        :key="tpl.id"
        class="flex justify-between items-center"
      >
        <div>
          <div class="font-bold">{{ tpl.name }}</div>
          <div class="text-sm text-gray-500">
            ¥{{ tpl.amount }} / {{ tpl.memo || 'メモなし' }}
          </div>
        </div>
        <n-button size="small" type="error" @click="templateStore.deleteTemplate(tpl.id)">
          削除
        </n-button>
      </n-list-item>
    </n-list>
  </n-space>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTemplateStore } from '../stores/templateStore'
import { useCardStore } from '../stores/cardStore'
import { useCategoryStore } from '../stores/categoryStore'

const templateStore = useTemplateStore()
const cardStore = useCardStore()
const categoryStore = useCategoryStore()

const newTemplate = ref({
  name: '',
  amount: 0,
  memo: '',
  cardId: '',
  categoryId: ''
})

const cardOptions = computed(() =>
  cardStore.cards.map((card) => ({
    label: card.name,
    value: card.id
  }))
)

const categoryOptions = computed(() =>
  categoryStore.categories.map((cat) => ({
    label: cat.name,
    value: cat.id
  }))
)

async function addTemplate() {
  // idはバックエンド生成なので渡さない
  await templateStore.addTemplate({
    name: newTemplate.value.name,
    amount: newTemplate.value.amount,
    memo: newTemplate.value.memo,
    cardId: newTemplate.value.cardId,
    categoryId: newTemplate.value.categoryId
  })

  newTemplate.value = {
    name: '',
    amount: 0,
    memo: '',
    cardId: '',
    categoryId: ''
  }
}

</script>
