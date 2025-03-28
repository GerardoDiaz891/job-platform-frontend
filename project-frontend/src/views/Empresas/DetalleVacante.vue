<template>
    <div class="container mx-auto px-4 py-8">
      <router-link 
        to="/empresarial/vacantes"
        class="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        Volver a mis vacantes
      </router-link>
  
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
  
      <div v-else-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
        <p>{{ error }}</p>
      </div>
  
      <div v-else class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-6">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h1 class="text-2xl font-bold">{{ vacante.nombre }}</h1>
              <p class="text-gray-500">Publicada el {{ formatDate(vacante.fechaPublicacion) }}</p>
            </div>
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {{ vacante.tipoTrabajo }}
            </span>
          </div>
  
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 class="text-lg font-semibold mb-4">Descripción de la vacante</h2>
              <p class="whitespace-pre-line">{{ vacante.descripcion }}</p>
            </div>
  
            <div>
              <h2 class="text-lg font-semibold mb-4">Detalles</h2>
              <div class="space-y-3">
                <div>
                  <h3 class="font-medium text-gray-700">Salario:</h3>
                  <p>${{ vacante.salario.toLocaleString() }}</p>
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
                  <h3 class="font-medium text-gray-700">Habilidades requeridas:</h3>
                  <p>{{ vacante.habilidadesRequeridas || 'No especificado' }}</p>
                </div>
                <div>
                  <h3 class="font-medium text-gray-700">Fecha de expiración:</h3>
                  <p>{{ formatDate(vacante.fechaExpiracion) }}</p>
                </div>
              </div>
            </div>
          </div>
  
          <div class="border-t pt-6">
            <h2 class="text-xl font-semibold mb-4">
              Postulaciones ({{ vacante.cVs.length }})
            </h2>
            
            <div v-if="vacante.cVs.length === 0" class="text-center py-8 text-gray-500">
              No hay postulaciones para esta vacante aún.
            </div>
            
            <div v-else class="space-y-4">
              <div 
                v-for="cv in vacante.cVs" 
                :key="cv.id"
                class="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium">Postulante #{{ cv.idUsuario }}</p>
                    <p class="text-sm text-gray-500">
                      Postulado el {{ formatDate(cv.fechaSubida) }}
                    </p>
                  </div>
                  <button 
                    @click="descargarCV(cv.idVacante, cv.idUsuario)"
                    class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
                  >
                    Descargar CV
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { getVacanteById, downloadCV } from '@/services/api';
  import type { VacanteDTO } from '@/types/VacantesDTO';
  
  export default defineComponent({
    name: 'DetalleVacante',
    
    data() {
      return {
        vacante: null as VacanteDTO | null,
        loading: true,
        error: null as string | null
      };
    },
  
    methods: {
      formatDate(dateString: string | Date) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      },
  
      async descargarCV(idVacante: number, idUsuario: number) {
        try {
          const blob = await downloadCV(idVacante);
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `CV-Postulante-${idUsuario}-Vacante-${idVacante}.pdf`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          this.error = 'Error al descargar el CV. Inténtalo nuevamente.';
          console.error('Error al descargar CV:', error);
        }
      }
    },
  
    async created() {
      try {
        const id = Number(this.$route.params.id);
        this.vacante = await getVacanteById(id);
      } catch (error) {
        this.error = error.message || 'Error al cargar la vacante';
        console.error('Error:', error);
      } finally {
        this.loading = false;
      }
    }
  });
  </script>