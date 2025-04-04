<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <HeaderComponent />
    <div class="container mx-auto px-4 py-8 flex-grow">
      <div class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 mb-8 text-white shadow-lg">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div class="mb-4 md:mb-0">
            <h1 class="text-3xl font-bold">Mis Vacantes</h1>
            <p class="text-blue-100">Administra las vacantes de tu empresa</p>
          </div>
          <router-link to="/empresarial/crear-vacante" class=" pr-8 btn-create">
            Nueva Vacante
          </router-link>
        </div>
      </div>

      <!-- Estado de carga -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-flex flex-col items-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mb-4"></div>
          <p class="text-gray-600">Cargando tus vacantes...</p>
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
            <h3 class="text-sm font-medium text-red-800">Error al cargar vacantes</h3>
            <div class="mt-2 text-sm text-red-700">
              <p>{{ error }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- No hay vacantes -->
      <div v-else-if="vacantes.length === 0" class="bg-white rounded-xl shadow-md p-8 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <h3 class="mt-2 text-lg font-medium text-gray-900">No hay vacantes publicadas</h3>
        <p class="mt-1 text-gray-500">Comienza creando tu primera vacante para atraer talento.</p>
        <div class="mt-6">
          <router-link to="/empresarial/crear-vacante" class="btn-create">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Crear Vacante
          </router-link>
        </div>
      </div>

      <!-- Lista de vacantes -->
      <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="vacante in vacantes" :key="vacante.id"
          class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div class="p-6">
            <div class="flex justify-between items-start mb-3">
              <h2 class="text-xl font-semibold text-gray-800">{{ vacante.nombre }}</h2>
              <span :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                (vacante.cVs?.length ?? 0) > 0 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              ]">
                {{ vacante.cVs?.length ?? 0 }} postulante{{ (vacante.cVs?.length ?? 0) !== 1 ? 's' : '' }}
              </span>
            </div>

            <p class="text-gray-600 mb-4">{{ truncateDescription(vacante.descripcion) }}</p>

            <div class="space-y-3 mb-5">
              <div class="flex items-center">
                <svg class="flex-shrink-0 h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-gray-700">{{ formatCurrency(vacante.salario) }}</span>
              </div>

              <div class="flex items-center">
                <svg class="flex-shrink-0 h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="text-gray-700">{{ vacante.ubicacion || 'No especificado' }}</span>
              </div>

              <div class="flex items-center">
                <svg class="flex-shrink-0 h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="text-gray-700">{{ vacante.tipoTrabajo }}</span>
              </div>
            </div>

            <div class="flex space-x-3">
              <router-link :to="`/empresarial/vacante/${vacante.id}`" class="btn-details">
                Ver detalles
              </router-link>
              <span class="text-xs text-gray-500 self-center">
                Publicada el {{ formatDate(vacante.fechaPublicacion) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { EmpresarialService } from '@/services/empresarialService';
import type { VacanteDTO } from '@/interfaces/VacantesDTO';
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default defineComponent({
  name: 'VacantesEmpresarial',
  components: {
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      vacantes: [] as VacanteDTO[],
      loading: true,
      error: null as string | null
    };
  },
  methods: {
    truncateDescription(desc: string): string {
      return desc.length > 120 ? `${desc.substring(0, 120)}...` : desc;
    },
    formatDate(dateString: string | Date | undefined): string {
      if (!dateString) return 'Fecha no disponible';
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },
    formatCurrency(amount: number) {
      return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
      }).format(amount);
    }
  },
  async created() {
    try {
      this.vacantes = await EmpresarialService.getMisVacantes();
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Error al cargar las vacantes';
      console.error('Error al cargar vacantes:', error);
    } finally {
      this.loading = false;
    }
  }
});
</script>
