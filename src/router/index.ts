// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

import CsvImport from '../pages/CSVImport.vue'
import CardRegister from '../pages/CardRegister.vue'
import Dashboard from '../pages/Dashboard.vue' // 任意の統合画面

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/csv-import', name: 'CsvImport', component: CsvImport },
  { path: '/card-register', name: 'CardRegister', component: CardRegister }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
