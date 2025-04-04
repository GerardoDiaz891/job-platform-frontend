<template>
  <HeaderComponent />
  <div class="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-2xl border border-gray-200">
    <h1 class="text-3xl font-extrabold text-center text-blue-700 mb-6">Detalles de la Vacante</h1>

    <div v-if="vacante" class="space-y-6">
      <div class="bg-gray-100 p-4 rounded-lg">
        <p class="text-lg text-gray-700"><strong class="text-gray-900">Nombre:</strong> {{ vacante.nombre }}</p>
      </div>
      <div class="bg-gray-100 p-4 rounded-lg">
        <p class="text-lg text-gray-700"><strong class="text-gray-900">Descripción:</strong> {{ vacante.descripcion }}
        </p>
      </div>
      <div class="bg-gray-100 p-4 rounded-lg">
        <p class="text-lg text-gray-700"><strong class="text-gray-900">Salario:</strong> {{
          formatCurrency(vacante.salario) }}</p>
      </div>
      <div class="bg-gray-100 p-4 rounded-lg">
        <p class="text-lg text-gray-700"><strong class="text-gray-900">Horario:</strong> {{ vacante.horario }}</p>
      </div>
      <div class="bg-gray-100 p-4 rounded-lg">
        <p class="text-lg text-gray-700"><strong class="text-gray-900">Ubicación:</strong> {{ vacante.ubicacion }}</p>
      </div>
      <div class="bg-gray-100 p-4 rounded-lg">
        <p class="text-lg text-gray-700"><strong class="text-gray-900">Tipo de Trabajo:</strong> {{ vacante.tipoTrabajo
        }}</p>
      </div>
      <div class="bg-gray-100 p-4 rounded-lg">
        <p class="text-lg text-gray-700"><strong class="text-gray-900">Fecha de Publicación:</strong> {{
          formatDate(vacante.fechaPublicacion) }}</p>
      </div>
      <div class="bg-gray-100 p-4 rounded-lg">
        <p class="text-lg text-gray-700"><strong class="text-gray-900">Fecha de Expiración:</strong> {{
          formatDate(vacante.fechaExpiracion) }}</p>
      </div>
      <div class="bg-gray-100 p-4 rounded-lg">
        <p class="text-lg text-gray-700"><strong class="text-gray-900">Habilidades Requeridas:</strong> {{
          vacante.habilidadesRequeridas }}</p>
      </div>

      <div v-if="error" class="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
        <p>{{ error }}</p>
      </div>

      <div v-if="successMessage" class="p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
        <p>{{ successMessage }}</p>
      </div>

      <div class="flex justify-center mt-6 space-x-4">
        <button @click="goBack"
          class="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200">
          Regresar
        </button>

        <template v-if="!hasApplied">
          <input ref="cvInput" type="file" accept=".pdf" @change="handleFileUpload" class="hidden" />
          <button @click="triggerFileInput" :disabled="isLoading"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            <span v-if="isLoading">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              Enviando...
            </span>
            <span v-else>Postularse</span>
          </button>
        </template>

        <button v-else disabled
          class="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md cursor-default">
          Ya has aplicado
        </button>
      </div>
    </div>

    <div v-else-if="error" class="text-center text-red-500 font-semibold mt-6">
      <p>Error al cargar la vacante: {{ error }}</p>
    </div>

    <div v-else class="text-center text-gray-500 mt-6">
      <div class="flex justify-center">
        <svg class="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
      </div>
      <p class="mt-2">Cargando detalles de la vacante...</p>
    </div>
  </div>
  <FooterComponent />
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { EmpresarialService } from '@/services/EmpresarialService'
import { PostulanteService } from '@/services/postulanteService'

const getVacanteById = EmpresarialService

export default {
  components: {
    HeaderComponent,
    FooterComponent
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const vacante = ref(null)
    const error = ref(null)
    const successMessage = ref('')
    const isLoading = ref(false)
    const hasApplied = ref(false)
    const cvInput = ref(null)

    const fetchVacante = async () => {
      try {
        const data = await getVacanteById(route.params.id)
        vacante.value = data
        await checkApplicationStatus()
      } catch (err) {
        error.value = err.message || 'Error al cargar la vacante'
      }
    }

    const checkApplicationStatus = async () => {
      try {
        const cv = await PostulanteService.checkExistingCV(route.params.id)
        hasApplied.value = cv !== null
      } catch (err) {
        console.error('Error al verificar estado de aplicación:', err)
      }
    }

    const handleFileUpload = async (event) => {
      const file = event.target.files[0]
      if (!file) return

      if (file.type !== 'application/pdf') {
        error.value = 'Por favor, sube un archivo PDF válido'
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        error.value = 'El archivo es demasiado grande (máximo 5MB)'
        return
      }

      isLoading.value = true
      error.value = ''
      successMessage.value = ''

      try {
        await PostulanteService.uploadCV(file, route.params.id)
        successMessage.value = '¡Tu CV se ha enviado correctamente!'
        hasApplied.value = true
      } catch (err) {
        if (err.response?.status === 401) {
          error.value = 'Debes iniciar sesión para postularte'
        } else if (err.response?.status === 400) {
          error.value = err.response.data.message || 'Datos inválidos'
        } else {
          error.value = 'Error al enviar el CV. Por favor, inténtalo de nuevo.'
        }
      } finally {
        isLoading.value = false
      }
    }

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString('es-MX', options)
    }

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
      }).format(amount)
    }

    const goBack = () => {
      router.push('/')
    }

    onMounted(() => {
      fetchVacante()
    })

    return {
      vacante,
      error,
      successMessage,
      isLoading,
      hasApplied,
      cvInput,
      triggerFileInput,
      handleFileUpload,
      formatDate,
      formatCurrency,
      goBack
    }
  }
}
</script>
