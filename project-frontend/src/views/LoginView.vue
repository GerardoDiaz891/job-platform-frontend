<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 p-4">
    <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
      <!-- Encabezado con logo y título -->
      <div class="flex flex-col items-center mb-8">
        <img :src="LogoGW" alt="Logo" class="w-20 h-20 mb-4">
        <h1 class="text-3xl font-bold text-gray-800">Bienvenido</h1>
        <p class="text-gray-500 mt-2">Ingresa a tu cuenta para continuar</p>
      </div>

      <form @submit.prevent="login" class="space-y-6">
        <!-- Campo de email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input v-model="email" type="email"
              class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="tu@correo.com" required />
          </div>
          <p v-if="!email && submitted" class="mt-1 text-sm text-red-600">Por favor ingresa tu correo</p>
        </div>

        <div>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input v-model="password" type="password"
              class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="••••••••" required />
          </div>
          <p v-if="!password && submitted" class="mt-1 text-sm text-red-600">Por favor ingresa tu contraseña</p>
        </div>

        <button type="submit"
          class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
          :disabled="loading" :class="{ 'opacity-75 cursor-not-allowed': loading }">
          <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          {{ loading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          ¿No tienes cuenta?
          <router-link to="/register" class="font-medium text-blue-600 hover:text-blue-500 hover:underline">Regístrate
            ahora</router-link>
        </p>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>

<script setup>
import { ref } from 'vue'
import { AuthService } from '@/services/authService'
import { useRouter } from 'vue-router'
import LogoGW from '@/assets/img/logo.png'

const email = ref('')
const password = ref('')
const loading = ref(false)
const submitted = ref(false)
const router = useRouter()

const login = async () => {
  submitted.value = true

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    alert('Por favor, ingresa un correo electrónico válido.')
    return
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  if (!passwordRegex.test(password.value)) {
    alert('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.')
    return
  }

  loading.value = true

  try {
    const credentials = {
      correo: email.value,
      contraseña: password.value,
    }

    const response = await AuthService.login(credentials)
    localStorage.setItem('token', response.token)
    //console.log('token', response)
    if (response.userData.rol === "1") {
      router.push('/admin/dashboard')
    } else {
      router.push('/')
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.')
  } finally {
    loading.value = false
  }
}

</script>

<style scoped>
input {
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-1px);
  transition: all 0.2s ease;
}
</style>
