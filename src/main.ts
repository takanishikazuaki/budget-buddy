// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import naive from 'naive-ui'
import 'tailwindcss/tailwind.css'
import {router} from './router/index'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(naive)
app.mount('#app')