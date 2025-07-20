<template>
  <n-card
    title="手入力で支出を追加"
    size="large"
    class="max-w-md mx-auto shadow-md"
    :bordered="false"
    embedded
  >
    <n-form @submit.prevent="submitTransaction" label-placement="top">
      <n-space vertical size="large">
        <n-form-item label="日付">
          <n-date-picker v-model:value="form.date" type="date" clearable />
        </n-form-item>

        <n-form-item label="金額">
          <n-input-number
            v-model:value="form.amount"
            placeholder="金額を入力"
            :min="0"
            clearable
          />
        </n-form-item>

        <n-form-item label="メモ">
          <n-input
            v-model:value="form.memo"
            placeholder="例: コンビニ"
            clearable
          />
        </n-form-item>

        <n-form-item label="使用カード">
          <n-select
            v-model:value="form.cardId"
            :options="cardOptions"
            placeholder="カードを選択"
            clearable
          />
        </n-form-item>

        <n-form-item label="カテゴリ">
          <n-select
            v-model:value="form.categoryId"
            :options="categoryOptions"
            placeholder="カテゴリを選択"
            clearable
          />
        </n-form-item>

        <n-button type="primary" block attr-type="submit" size="large">
          🎮 登録する
        </n-button>

    <n-form-item label="テンプレート選択">
      <n-select
        v-model:value="selectedTemplateId"
        :options="templateOptions"
        placeholder="テンプレートを選択"
        clearable
        @update:value="applyTemplate"
      />
    </n-form-item>


      </n-space>
    </n-form>
  </n-card>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTransactionStore } from '../stores/transactionStore'
import { useCardStore } from '../stores/cardStore'
import { useTemplateStore } from '../stores/templateStore'
import { useCategoryStore } from '../stores/categoryStore'
import {
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NButton,
  NDatePicker,
  NInputNumber
} from 'naive-ui'

const transactionStore = useTransactionStore()
const cardStore = useCardStore()
const categoryStore = useCategoryStore()
const templateStore = useTemplateStore()

const form = ref<{
  date: number | null
  amount: number
  memo: string
  cardId: string
  categoryId: string
}>({
  date: null,
  amount: 0,
  memo: '',
  cardId: '',
  categoryId: ''
})

const selectedTemplateId = ref<string | null>(null)

const templateOptions = computed(() =>
  templateStore.templates.map((tpl: { name: any; id: any }) => ({
    label: tpl.name,
    value: tpl.id
  }))
)

function applyTemplate(id: string | null) {
  const tpl = templateStore.templates.find((t: { id: string | null }) => t.id === id)
  if (tpl) {
    form.value.amount = tpl.amount
    form.value.memo = tpl.memo
    form.value.cardId = tpl.cardId
    form.value.categoryId = tpl.categoryId
  }
}

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

function submitTransaction() {
  transactionStore.addTransaction({
    id: crypto.randomUUID(),
    date: form.value.date ? new Date(form.value.date).toISOString().split('T')[0] : '',
    amount: form.value.amount,
    memo: form.value.memo,
    cardId: form.value.cardId,
    categoryId: form.value.categoryId
  })

  form.value = {
    date: null,
    amount: 0,
    memo: '',
    cardId: '',
    categoryId: ''
  }
}
</script>

