<template>
<!-- カードを選択する(ドロップダウン) -->
<h2>カードを選択する</h2>
<label for="card">決済種別を選んでください</label>
<select id="card" name="card" v-model="selectedCardId">
    <option disabled value="">-- カードを選択 --</option>
    <option v-for="card in cards" :key="card.id" :value="card.id">
        {{ card.name }}
    </option>
</select>
<!-- CSVを取り込みボタン（ローカルファイルから） -->
<h2>CSVを取り込むボタン</h2>
<input type="file" accept=".csv" @change="handleFileChange" />
<!-- データをプレビュー（そして良ければ登録へ） -->
<div v-if="preview.length">
  <h2>プレビュー</h2>
  <table>
    <thread>
        <tr>
            <th>日付</th>
            <th>金額</th>
            <th>メモ</th>
        </tr>
    </thread>
    <tbody>
        <tr v-for="(row, index) in preview" :key="index">
            <td>{{ row.date }}</td>
            <td>{{ row.amount }}</td>
            <td>{{ row.memo }}</td>
        </tr>
    </tbody>
  </table>
</div>
</template>

<script setup lang="ts">
import type {Card} from '../stores/cardStore'
import {ref} from 'vue'
import Papa from 'papaparse'

const cards = ref<Card[]>([
    {id:'paypay',name:'PayPay'},
    {id:'rakuten',name:'楽天'},
    {id:'sbi',name:'SBI'}
])

const selectedCardId = ref<string>('')
const preview = ref<{ date: string; amount:number; memo:string}[]>([])

function handleFileChange(event:Event){
    const file = (event.target as HTMLInputElement).files?.[0]
    if(!file) return
    Papa.parse(file,{
        header:true,
        skipEmptyLines:true,
        complete(results: { data: { date: string; amount: number; memo: string }[] }){
            preview.value = results.data as typeof preview.value
        }
    })
}
</script>
