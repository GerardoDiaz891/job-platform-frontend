<template>
  <div class="px-4 py-8 sm:px-6 lg:px-8">
    <!-- Encabezado y buscador -->
    <div class="text-center mb-10">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Vacantes Disponibles</h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Encuentra la oportunidad laboral que estás buscando
      </p>
    </div>

    <!-- Buscador -->
    <div class="max-w-2xl mx-auto mb-12 relative">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
        </svg>
      </div>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar por puesto, descripción o ubicación..."
        class="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
      />
    </div>

    <!-- Mensajes de estado -->
    <p v-if="filteredVacantes.length === 0 && !errorMessage" class="text-center text-gray-500 text-lg py-12">
      No hay vacantes disponibles que coincidan con tu búsqueda.
    </p>
    <p v-if="errorMessage" class="text-center text-red-600 font-medium py-12">
      {{ errorMessage }}
    </p>

    <!-- Grid de vacantes -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <!-- Tarjeta de vacante -->
      <div
        v-for="vacante in filteredVacantes"
        :key="vacante.id"
        class="bg-white overflow-hidden shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100"
      >
        <!-- Encabezado de la tarjeta -->
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <img
                :src="vacante.logoEmpresa || 'https://img.icons8.com/fluency/96/000000/company.png'"
                alt="Logo empresa"
                class="w-12 h-12 object-contain rounded-full border border-gray-200"
              />
              <div class="ml-4">
                <h3 class="text-lg font-bold text-gray-900">{{ vacante.nombre }}</h3>
                <p class="text-sm text-gray-500">{{ vacante.nombreEmpresa }}</p>
              </div>
            </div>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {{ vacante.tipoTrabajo }}
            </span>
          </div>

          <!-- Descripción -->
          <p class="text-gray-600 mb-4 line-clamp-3">{{ vacante.descripcion }}</p>

          <!-- Detalles -->
          <div class="space-y-3">
            <div class="flex items-center text-sm text-gray-600">
              <svg class="flex-shrink-0 mr-2 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="font-medium">Salario:</span> ${{ vacante.salario.toLocaleString() }}
            </div>
            
            <div class="flex items-center text-sm text-gray-600">
              <svg class="flex-shrink-0 mr-2 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span class="font-medium">Ubicación:</span> {{ vacante.ubicacion }}
            </div>
            
            <div class="flex items-center text-sm text-gray-600">
              <svg class="flex-shrink-0 mr-2 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="font-medium">Horario:</span> {{ vacante.horario }}
            </div>
          </div>

          <!-- Fechas -->
          <div class="mt-4 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-500">
            <div>
              <span class="font-medium">Publicado:</span> {{ formatDate(vacante.fechaPublicacion) }}
            </div>
            <div>
              <span class="font-medium">Expira:</span> {{ formatDate(vacante.fechaExpiracion) }}
            </div>
          </div>
        </div>

        <!-- Pie de tarjeta -->
        <div class="bg-gray-50 px-6 py-4">
          <router-link
            :to="'/vacante/' + vacante.id"
            class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
          >
            Ver detalles
            <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getVacantes } from '@/services/api.js'

const vacantes = ref([])
const errorMessage = ref('')
const searchQuery = ref('')

const filteredVacantes = computed(() => {
  if (!searchQuery.value) return vacantes.value
  const query = searchQuery.value.toLowerCase()
  return vacantes.value.filter(
    (vacante) =>
      vacante.nombre.toLowerCase().includes(query) ||
      vacante.descripcion.toLowerCase().includes(query) ||
      vacante.ubicacion.toLowerCase().includes(query)
  )
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

onMounted(async () => {
  try {
    const data = await getVacantes()
    vacantes.value = data.map(vacante => ({
      ...vacante,
      logoEmpresa: vacante.logoEmpresa || 'https://img.icons8.com/fluency/96/000000/company.png'
    }))
  } catch (error) {
    errorMessage.value = 'Hubo un error al cargar las vacantes. Por favor, inténtalo de nuevo más tarde.'
    console.error('Error al cargar las vacantes:', error)
  }
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.transition {
  transition: all 0.2s ease-in-out;
}
</style>