<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <router-link to="/empresarial/vacantes"
        class="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 group transition-colors">
        <svg class="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver a mis vacantes
      </router-link>

      <!-- Estado de carga -->
      <div v-if="loading" class="text-center py-12">
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
                    <p class="text-lg font-semibold">${{ vacante.salario.toLocaleString() }}</p>
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
            </div>
          </div>

          <!-- Sección de postulaciones -->
          <div class="border-t pt-8 mt-8">
            <h2 class="text-2xl font-semibold mb-6 flex items-center">
              <svg class="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Postulaciones ({{ vacante.cVs?.length || 0 }})
            </h2>

            <div v-if="!vacante.cVs || vacante.cVs.length === 0" class="text-center py-8 bg-gray-50 rounded-lg">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 class="mt-2 text-lg font-medium text-gray-900">No hay postulaciones</h3>
              <p class="mt-1 text-gray-500">Aún no hay candidatos para esta vacante.</p>
            </div>

            <div v-else class="space-y-4">
              <div v-for="cv in vacante.cVs" :key="cv.id"
                class="border rounded-lg p-5 hover:bg-gray-50 transition-colors">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div class="mb-3 md:mb-0">
                    <p class="font-medium text-lg">Postulante #{{ cv.idUsuario }}</p>
                    <p class="text-sm text-gray-500">
                      Postulado el {{ formatDate(cv.fechaSubida) }}
                    </p>
                  </div>
                  <div class="flex space-x-3">
                    <button @click="descargarCV(cv.idVacante, cv.idUsuario)" class="btn-download">
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Descargar CV
                    </button>
                    <button @click="contactarPostulante(cv.idUsuario)" class="btn-contact">
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Contactar
                    </button>
                  </div>
                </div>
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
import { EmpresarialService } from '@/services/EmpresarialService'
import type { VacanteDTO, CVDTO } from '@/interfaces/VacantesDTO';

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
    formatDate(dateString: string | Date | undefined): string {
      if (!dateString) return 'Fecha no especificada';
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },

    // Cambiar el método descargarCV
    async descargarCV(idVacante: number | undefined, idUsuario: number | undefined) {
      if (!idVacante || !idUsuario) {
        this.error = 'Datos de CV inválidos'
        return
      }

      try {
        const blob = await EmpresarialService.downloadApplicantCV(idVacante, idUsuario)
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `CV-Postulante-${idUsuario}-Vacante-${idVacante}.pdf`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } catch (error) {
        this.error = 'Error al descargar el CV. Inténtalo nuevamente.'
        console.error('Error al descargar CV:', error)
      }
    },

    contactarPostulante(idUsuario: number | undefined) {
      if (!idUsuario) return;
      console.log(`Contactando al usuario ${idUsuario}`);
    }
  },

  async created() {
    try {
      const id = Number(this.$route.params.id)
      if (isNaN(id)) throw new Error('ID de vacante inválido')

      this.vacante = await EmpresarialService.getVacanteById(id)
      if (!this.vacante) throw new Error('Vacante no encontrada')
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Error al cargar la vacante'
      console.error('Error:', error)
    } finally {
      this.loading = false
    }
  }
});
</script>