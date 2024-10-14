import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import CardDetail from '@/pages/CardDetail.vue'

const app = createApp(App)
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/:id', name: 'CardDetail', component: CardDetail }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
