<template>
  <n-modal :show="show" @update:show="val => emit('update:show', val)" title="取引編集" preset="dialog" :mask-closable="false" :show-footer="false" style="min-width: 400px;">
    <n-form label-placement="top" @submit.prevent="onSave">
      <n-form-item label="日付">
        <n-date-picker v-model:value="localTransaction.date" type="date" />
      </n-form-item>

      <n-form-item label="金額">
        <n-input-number v-model:value="localTransaction.amount" :min="0" />
      </n-form-item>

      <n-form-item label="メモ">
        <n-input v-model:value="localTransaction.memo" />
      </n-form-item>

      <n-form-item label="カード">
        <n-select
          v-model:value="localTransaction.cardId"
          :options="cardOptions"
          placeholder="カードを選択"
          clearable
        />
      </n-form-item>

      <n-form-item label="カテゴリ">
        <n-select
          v-model:value="localTransaction.categoryId"
          :options="categoryOptions"
          placeholder="カテゴリを選択"
          clearable
        />
      </n-form-item>

      <div class="flex justify-between mt-4">
        <n-button type="error" @click="onDelete">削除</n-button>
        <div>
          <n-button @click="close">キャンセル</n-button>
          <n-button type="primary" @click="onSave">保存</n-button>
        </div>
      </div>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useCardStore } from '../stores/cardStore'
import { useCategoryStore } from '../stores/categoryStore'
import { useTransactionStore } from '../stores/transactionStore'
import {
  NModal,
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NInputNumber,
  NButton,
  NDatePicker
} from 'naive-ui'

interface Transaction {
  id: string
  date: string
  amount: number
  memo: string
  cardId: string
  categoryId: string
}

const props = defineProps({
  show: Boolean,
  transaction: Object as () => Transaction | null
})

const emit = defineEmits(['update:show', 'saved', 'deleted'])

const cardStore = useCardStore()
const categoryStore = useCategoryStore()
const transactionStore = useTransactionStore()

const localTransaction = ref<Transaction>({
  id: '',
  date: '',
  amount: 0,
  memo: '',
  cardId: '',
  categoryId: ''
})

// props.transaction の変更をローカルに反映
watch(
  () => props.transaction,
  (val) => {
    if (val) {
      localTransaction.value = { ...val }
    }
  },
  { immediate: true }
)

const cardOptions = computed(() =>
  cardStore.cards.map(card => ({
    label: card.name,
    value: card.id
  }))
)

const categoryOptions = computed(() =>
  categoryStore.categories.map(cat => ({
    label: cat.name,
    value: cat.id
  }))
)

function close() {
  emit('update:show', false)
}

async function onSave() {
  console.log('送信前 localTransaction', localTransaction.value)
  console.log('送信対象データ:', localTransaction.value)
  try {
    await transactionStore.updateTransaction(localTransaction.value.id, {
      date: localTransaction.value.date,
      amount: localTransaction.value.amount,
      memo: localTransaction.value.memo,
      cardId: localTransaction.value.cardId,
      categoryId: localTransaction.value.categoryId
    })
    emit('saved', localTransaction.value)
    close()
  } catch (e) {
    console.error('更新失敗', e)
  }
}


async function onDelete() {
  try {
    await transactionStore.removeTransaction(localTransaction.value.id)
    emit('deleted', localTransaction.value.id)
    close()
  } catch (e) {
    console.error('削除失敗', e)
  }
}

</script>
