<template>
  <div class="col-span-full mb-6">
    <div class="max-w-md mx-auto">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar vacantes por nombre o descripción..."
        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  <p v-if="filteredVacantes.length === 0" class="text-gray-500 text-center text-sm col-span-full">
    No hay vacantes disponibles en este momento.
  </p>
  <p v-if="errorMessage" class="text-red-600 font-semibold text-center text-sm col-span-full">
    {{ errorMessage }}
  </p>

  <div
    v-for="vacante in filteredVacantes"
    :key="vacante.id"
    class="bg-white shadow-lg rounded-xl p-4 max-w-sm w-full mb-4 border border-gray-200"
  >
    <div class="flex justify-center mb-3">
      <img
        src="https://img.pikbest.com/png-images/20241118/job-logo-design-png-_11101892.png!sw800"
        alt="Company Logo"
        class="w-16 h-16 object-contain"
      />
    </div>
    <div class="text-center">
      <h3 class="text-lg font-semibold text-blue-700">{{ vacante.nombre }}</h3>
      <p class="text-gray-600 text-sm mt-1">{{ vacante.descripcion }}</p>

      <div class="mt-2 text-xs text-gray-700 space-y-1">
        <p><strong>Salario:</strong> ${{ vacante.salario }}</p>
        <p><strong>Horario:</strong> {{ vacante.horario }}</p>
        <p><strong>Ubicación:</strong> {{ vacante.ubicacion }}</p>
        <p><strong>Tipo:</strong> {{ vacante.tipoTrabajo }}</p>
      </div>

      <div class="mt-2 text-xs text-gray-500">
        <p><strong>Publicado:</strong> {{ formatDate(vacante.fechaPublicacion) }}</p>
        <p><strong>Expira:</strong> {{ formatDate(vacante.fechaExpiracion) }}</p>
      </div>
      <router-link
        :to="'/vacante/' + vacante.id"
        class="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 text-sm rounded-md font-medium transition duration-200 text-center block"
      >
        Ver vacante
      </router-link>
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
      vacante.descripcion.toLowerCase().includes(query),
  )
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

onMounted(async () => {
  try {
    vacantes.value = await getVacantes()
  } catch (error) {
    errorMessage.value = 'Hubo un error al cargar las vacantes.'
    console.error('Error al cargar las vacantes:', error)
  }
})
</script>
