<template>
    <div class="container mx-auto px-4 py-8">
      <div v-if="loading" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p class="mt-2">Cargando tus vacantes...</p>
      </div>
  
      <div v-else>
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold">Mis Vacantes Publicadas</h1>
          <router-link 
            to="/empresarial/crear-vacante"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Crear Nueva Vacante
          </router-link>
        </div>
  
        <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{{ error }}</p>
        </div>
  
        <div v-if="vacantes.length === 0" class="bg-blue-50 border-l-4 border-blue-500 p-4">
          <p class="text-blue-700">No has creado ninguna vacante aún.</p>
        </div>
  
        <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div 
            v-for="vacante in vacantes" 
            :key="vacante.id"
            class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div class="p-6">
              <div class="flex justify-between items-start">
                <h2 class="text-xl font-semibold mb-2">{{ vacante.nombre }}</h2>
                <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {{ vacante.cVs.length }} postulaciones
                </span>
              </div>
              
              <p class="text-gray-600 mb-4">{{ truncateDescription(vacante.descripcion) }}</p>
              
              <div class="space-y-2 mb-4">
                <div class="flex items-center">
                  <span class="text-gray-700 font-medium mr-2">Salario:</span>
                  <span>${{ vacante.salario.toLocaleString() }}</span>
                </div>
                
                <div class="flex items-center">
                  <span class="text-gray-700 font-medium mr-2">Ubicación:</span>
                  <span>{{ vacante.ubicacion || 'No especificado' }}</span>
                </div>
                
                <div class="flex items-center">
                  <span class="text-gray-700 font-medium mr-2">Tipo:</span>
                  <span>{{ vacante.tipoTrabajo }}</span>
                </div>
              </div>
  
              <div class="flex space-x-2">
                <router-link 
                  :to="`/empresarial/vacante/${vacante.id}`"
                  class="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded text-sm text-center"
                >
                  Ver detalles
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { getVacantesEmpresarial } from '@/services/api';
  import type { VacanteDTO } from '@/types/VacantesDTO';
  
  export default defineComponent({
    name: 'VacantesEmpresarial',
    
    data() {
      return {
        vacantes: [] as VacanteDTO[],
        loading: true,
        error: null as string | null
      };
    },
  
    methods: {
      truncateDescription(desc: string): string {
        return desc.length > 100 ? `${desc.substring(0, 100)}...` : desc;
      }
    },
  
    async created() {
      try {
        this.vacantes = await getVacantesEmpresarial();
      } catch (error) {
        this.error = error.message;
        console.error('Error al cargar vacantes:', error);
      } finally {
        this.loading = false;
      }
    }
  });
  </script>
  
  <style scoped>
  .vacante-card {
    transition: all 0.3s ease;
  }
  
  .vacante-card:hover {
    transform: translateY(-2px);
  }
  </style>