import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/authStore'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const authStore = useAuthStore()
if (authStore.token && !authStore.user) {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}')
  authStore.user = userData
}

app.mount('#app')
