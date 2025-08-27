import { createRouter, createWebHistory } from 'vue-router'

import CsvImport from '../pages/CSVImportPage/CSVImport.vue'
import TransactionPage from '../pages/TransactionPage/TransactionPage.vue'
import Dashboard from '../pages/DashboadPage/Dashboard.vue'

const routes = [
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/', name: 'ManualEntry', component: TransactionPage },
  { path: '/csv-import', name: 'CsvImport', component: CsvImport },
  { path: '/cards', name: 'CardManager', component: () => import('../pages/CardManagerPage/CardManager.vue') },
  { path: '/categories', name: 'CategoryManager', component: () => import('../pages/CategoryPage/CategoryManager.vue') },
  { path: '/settings', name: 'Settings', component: () => import('../pages/SettingsPage/Settings.vue') },
  { path: '/calendar', name: 'Calendar', component: () => import('../pages/CalendarPage/CalendarPage.vue') },
  { path: '/template', name: 'TemplateManager', component: () => import('../pages/TemplateManagerPage/TemplateManager.vue') },
  { path: '/theme', name: 'ThemeSettings', component: () => import('../pages/ThemeSettingPage/ThemeSettings.vue') }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})