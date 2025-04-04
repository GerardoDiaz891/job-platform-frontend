<template>
  <div class="min-h-screen bg-gray-50">
    <HeaderComponent />
    <div class="container mx-auto px-4 py-8">
      <button @click="goBack"
        class="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 group transition-colors">
        <svg class="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver a vacantes
      </button>

      <!-- Estado de carga -->
      <div v-if="!vacante && !error" class="text-center py-12">
        <div class="inline-flex flex-col items-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mb-4"></div>
          <p class="text-gray-600">Cargando detalles de la vacante...</p>
        </div>
      </div>

      <!-- Mensaje de error -->
      <div v-else-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Error al cargar la vacante</h3>
            <div class="mt-2 text-sm text-red-700">
              <p>{{ error }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Detalle de la vacante -->
      <div v-else-if="vacante" class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 class="text-2xl font-bold">{{ vacante.nombre }}</h1>
              <p class="text-blue-100">Publicada el {{ formatDate(vacante.fechaPublicacion) }}</p>
            </div>
            <span
              class="mt-2 md:mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20">
              {{ vacante.tipoTrabajo }}
            </span>
          </div>
        </div>

        <!-- Contenido principal -->
        <div class="p-6">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2">
              <div class="mb-8">
                <h2 class="text-xl font-semibold mb-4 flex items-center">
                  <svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Descripción de la vacante
                </h2>
                <div class="prose max-w-none">
                  <p class="whitespace-pre-line">{{ vacante.descripcion }}</p>
                </div>
              </div>

              <!-- Habilidades requeridas -->
              <div v-if="vacante.habilidadesRequeridas" class="mb-8">
                <h2 class="text-xl font-semibold mb-4 flex items-center">
                  <svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Habilidades requeridas
                </h2>
                <div class="flex flex-wrap gap-2">
                  <span v-for="(habilidad, index) in vacante.habilidadesRequeridas.split(',')" :key="index"
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {{ habilidad.trim() }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Columna derecha para Detalles -->
            <div class="lg:col-span-1">
              <div class="bg-gray-50 rounded-lg p-5">
                <h2 class="text-xl font-semibold mb-4 flex items-center">
                  <svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Detalles
                </h2>

                <div class="space-y-4">
                  <div>
                    <h3 class="font-medium text-gray-700">Salario:</h3>
                    <p class="text-lg font-semibold">{{ formatCurrency(vacante.salario) }}</p>
                  </div>

                  <div>
                    <h3 class="font-medium text-gray-700">Horario:</h3>
                    <p>{{ vacante.horario || 'No especificado' }}</p>
                  </div>

                  <div>
                    <h3 class="font-medium text-gray-700">Ubicación:</h3>
                    <p>{{ vacante.ubicacion || 'No especificado' }}</p>
                  </div>

                  <div>
                    <h3 class="font-medium text-gray-700">Fecha de expiración:</h3>
                    <p>{{ formatDate(vacante.fechaExpiracion) }}</p>
                  </div>
                </div>
              </div>

              <!-- Sección de postulación -->
              <div class="mt-6 bg-gray-50 rounded-lg p-5">
                <h2 class="text-xl font-semibold mb-4 flex items-center">
                  <svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Postularse
                </h2>

                <div v-if="error" class="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-r">
                  <p>{{ error }}</p>
                </div>

                <div v-if="successMessage"
                  class="mb-4 p-3 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-r">
                  <p>{{ successMessage }}</p>
                </div>

                <div v-if="!hasApplied">
                  <input ref="cvInput" type="file" accept=".pdf" @change="handleFileUpload" class="hidden" />
                  <button @click="triggerFileInput" :disabled="isLoading"
                    class="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                    <span v-if="isLoading">
                      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                      </svg>
                      Subiendo...
                    </span>
                    <span v-else>
                      <svg class="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Subir CV (PDF)
                    </span>
                  </button>
                  <p class="mt-2 text-xs text-gray-500">Formatos aceptados: PDF (máx. 5MB)</p>
                </div>

                <div v-else class="text-center py-4">
                  <div class="inline-flex items-center text-green-600">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="font-medium">¡Ya has aplicado a esta vacante!</span>
                  </div>
                  <button @click="downloadMyCV"
                    class="mt-4 w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg class="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Ver mi CV enviado
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PostulanteService } from '@/services/postulanteService'
import { VacanteService } from '@/services/VacanteService'

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
        const id = parseInt(route.params.id)
        if (isNaN(id)) throw new Error('ID de vacante inválido')

        const data = await VacanteService.getVacanteById(id)
        vacante.value = data

        // Verificar si el usuario ya aplicó
        const userData = JSON.parse(localStorage.getItem('userData') || '{}')
        const userId = userData.id
        if (userId && data.cVs) {
          hasApplied.value = data.cVs.some(cv => cv.idUsuario === userId)
        }
      } catch (err) {
        error.value = err.message || 'Error al cargar la vacante'
      }
    }

    const triggerFileInput = () => {
      if (cvInput.value) {
        cvInput.value.click()
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
        // Recargar los datos de la vacante para actualizar el estado
        await fetchVacante()
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

    const downloadMyCV = async () => {
      try {
        // VERIFICAR QUE SI HAYAN USUARIOS Y VACANTES
        if (!vacante.value) {
          error.value = 'No se encontró información de la vacante';
          return;
        }

        const userData = JSON.parse(localStorage.getItem('userData') || {});
        const userId = userData.id;

        if (!userId) {
          error.value = 'Debes iniciar sesión para descargar tu CV';
          return;
        }

        // LLAMAMOS AL SERVICIO A  ATRAVES DEL ID DE LA VACANTE
        const blob = await PostulanteService.downloadMyCV(vacante.value.id);

        // ENLACE DE DESCARGA
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        // NOMBRE DEL ARCHIVO DEL HEADER O UNO POR DEFECTO
        const contentDisposition = blob.headers?.['content-disposition'];
        let fileName = `CV-${vacante.value.nombre || 'vacante'}.pdf`;

        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename\*?=['"]?(?:UTF-\d['"]*)?([^;\r\n"']*)['"]?;?/i);
          if (fileNameMatch && fileNameMatch[1]) {
            fileName = fileNameMatch[1];
          }
        }

        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (err) {
        error.value = 'Error al descargar tu CV. Inténtalo nuevamente.';
        console.error('Error al descargar CV:', err);
      }
    };

    const formatDate = (dateString) => {
      if (!dateString) return 'Fecha no especificada'
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
      downloadMyCV,
      formatDate,
      formatCurrency,
      goBack
    }
  }
}
</script>

<style scoped>
.prose {
  color: #374151;
  line-height: 1.625;
}

.prose p {
  margin-top: 0;
  margin-bottom: 1em;
}
</style>