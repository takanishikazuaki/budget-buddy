<template>
    <TransactionForm @add="handleadd"/>
    <TransactionList :transactions="transactions"/>
</template>

<script setup lang="ts">
import TransactionForm from '../components/TransactionForm.vue';
import TransactionList from '../components/TransactionList.vue';
import { ref } from 'vue';
import type { Transaction } from '../stores/transactionStore';

const transactions = ref<Transaction[]>([])

function handleadd(newTx:Transaction){
    transactions.value.push(newTx)
}

</script>