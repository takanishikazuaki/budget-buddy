// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

import CsvImport from '../pages/CSVImport.vue'
import TransactionForm from '../pages/TransactionForm.vue'
import Dashboard from '../pages/Dashboard.vue' // 任意の統合画面

const routes = [
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/', name: 'ManualEntry', component:TransactionForm  },
  { path: '/csv-import', name: 'CsvImport', component: CsvImport },
  {path: '/cards',name: 'CardManager',component: () => import('../pages/CardManager.vue')},
  {path: '/categories',name: 'CategoryManager',component: () => import('../pages/CategoryManager.vue')},
  {path: '/settings', name: 'Settings', component: () => import('../pages/Settings.vue') },
  {path: '/calendar',name: 'Calendar',component: () => import('../pages/CalendarPage.vue')}
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
