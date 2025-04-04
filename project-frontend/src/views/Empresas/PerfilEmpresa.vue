<template>
  <HeaderComponent />
  <main class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <!-- Encabezado -->
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Perfil Empresarial</h1>
        <p class="text-lg text-gray-600">Actualiza la información de tu empresa</p>
      </div>

      <!-- Formulario -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="p-8">
          <form @submit.prevent="saveProfile" class="space-y-6">
            <!-- Sección 1: Información básica -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Nombre -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de la empresa <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <input v-model="name" type="text" required
                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nombre legal de la empresa" />
                </div>
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input v-model="email" type="email" required
                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="correo@empresa.com" />
                </div>
              </div>
            </div>

            <!-- Descripción -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Descripción de la empresa <span class="text-red-500">*</span>
              </label>
              <textarea v-model="description" rows="4" required
                class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe los servicios o productos que ofrece tu empresa..."></textarea>
              <p class="mt-1 text-xs text-gray-500">Máximo 500 caracteres</p>
            </div>

            <!-- Sección 2: Contacto -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Ubicación -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Dirección <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <input v-model="location" type="text" required
                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Dirección completa" />
                </div>
              </div>

              <!-- Teléfono -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input v-model="phone" type="tel" required
                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+51 987 654 321" />
                </div>
              </div>
            </div>

            <!-- Sección 3: Botones -->
            <div class="flex flex-col sm:flex-row justify-end gap-4 pt-6">
              <button type="button" @click="resetForm"
                class="px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
                Cancelar
              </button>
              <button type="submit" :disabled="loading"
                class="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                :class="{ 'opacity-75 cursor-not-allowed': loading }">
                <span v-if="!loading">Guardar cambios</span>
                <span v-else class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                  Guardando...
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
  <FooterComponent />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import FooterComponent from '@/components/FooterComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import { AuthService } from '@/services/authService'

const description = ref('')
const location = ref('')
const email = ref('')
const name = ref('')
const phone = ref('')
const loading = ref(false)
let currentProfile = null // Almanecenamiento del perfil actual

// Datos iniciales
async function loadProfile() {
  try {
    const dataInfo = await AuthService.getProfile()
    currentProfile = dataInfo // GUARDAR PERFIL COMPLETO
    description.value = dataInfo.descripcionEmpresa || ''
    location.value = dataInfo.direccion || ''
    name.value = dataInfo.nombre || ''
    email.value = dataInfo.correo || ''
    phone.value = dataInfo.telefono || ''
  } catch (error) {
    console.error('Error al cargar el perfil:', error)
  }
}

async function saveProfile() {
  loading.value = true
  try {
    const updateData = {
      nombre: name.value,
      contraseña: currentProfile?.contraseña || "",  // Mandar la contraseña actual
      nombreEmpresa: currentProfile?.nombreEmpresa || '',
      tipoEmpresa: currentProfile?.tipoEmpresa || '',
      direccion: location.value,
      telefono: phone.value,
      sitioWeb: currentProfile?.sitioWeb || '',
      descripcionEmpresa: description.value
    }

    //console.log('Datos enviados:', updateData)
    const response = await AuthService.updateProfile(updateData)
    console.log('Perfil actualizado:', response)
    //alert('Perfil actualizado exitosamente')
  } catch (error) {
    console.error('Error al actualizar el perfil:', error)
    alert('Error al actualizar el perfil: ' + (error.response?.data?.title || error.message))
  } finally {
    loading.value = false
  }
}

function resetForm() {
  loadProfile()
}

onMounted(() => {
  const token = localStorage.getItem('token')
  if (!token) {
    console.error('No hay token, redirigiendo al login...')
  } else {
    loadProfile()
  }
})
</script>
