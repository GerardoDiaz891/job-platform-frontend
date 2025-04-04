<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <HeaderComponent />
    <!-- Mensaje de confirmación -->
    <div v-if="showSuccessMessage" class="fixed top-4 right-4 z-50">
      <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-lg max-w-sm">
        <div class="flex items-center">
          <svg class="h-6 w-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p class="font-bold">¡Éxito!</p>
            <p>Vacante creada correctamente</p>
          </div>
          <button @click="showSuccessMessage = false" class="ml-auto text-green-700 hover:text-green-900">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Contenido principal -->
    <main class="flex-grow py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <!-- Encabezado mejorado -->
          <div class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 mb-8 text-white shadow-lg relative overflow-hidden">
            <div class="relative z-10">
              <h1 class="text-3xl font-bold mb-2">Crear Nueva Vacante</h1>
              <p class="text-blue-100 opacity-90">Completa el formulario para publicar tu vacante</p>
            </div>
            <div class="absolute -right-10 -bottom-10 opacity-20">
              <svg class="w-40 h-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
              </svg>
            </div>
          </div>

          <!-- Formulario mejorado -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <form @submit.prevent="submitForm" class="p-6 space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Nombre -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nombre de la vacante*</label>
                  <input v-model="form.nombre" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
                         placeholder="Ej: Desarrollador Frontend Senior">
                </div>

                <!-- Descripción -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Descripción*</label>
                  <textarea v-model="form.descripcion" required rows="6" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            placeholder="Describe las responsabilidades, requisitos y beneficios del puesto..."></textarea>
                </div>

                <!-- Salario -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Salario*</label>
                  <div class="relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span class="text-gray-500">$</span>
                    </div>
                    <input v-model.number="form.salario" type="number" min="0" step="100" required 
                           class="block w-full pl-8 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
                           placeholder="0.00">
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span class="text-gray-500">MXN</span>
                    </div>
                  </div>
                </div>

                <!-- Fecha Expiración -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Fecha de expiración*</label>
                  <input v-model="form.fechaExpiracion" type="date" required 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                         :min="new Date().toISOString().split('T')[0]">
                </div>

                <!-- Horario -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Horario*</label>
                  <input v-model="form.horario" required 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                         placeholder="Ej: Lunes a Viernes, 9:00 am - 6:00 pm">
                </div>

                <!-- Tipo de Trabajo -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de trabajo*</label>
                  <select v-model="form.tipoTrabajo" required 
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200">
                    <option value="Remoto">Remoto</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Híbrido">Híbrido</option>
                  </select>
                </div>

                <!-- Ubicación -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Ubicación*</label>
                  <input v-model="form.ubicacion" required 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
                         placeholder="Ej: Ciudad de México (Remoto)">
                </div>

                <!-- Habilidades Requeridas -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Habilidades requeridas*</label>
                  <input v-model="form.habilidadesRequeridas" required 
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                         placeholder="Ej: JavaScript, React, Trabajo en equipo">
                  <p class="mt-1 text-sm text-gray-500">Separa las habilidades con comas</p>
                </div>
              </div>

              <!-- Botones -->
              <div class="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
                <router-link to="/empresarial/vacantes" 
                            class="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition duration-200 text-center">
                  Cancelar
                </router-link>
                <button type="submit" 
                        class="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white transition duration-200 flex items-center justify-center"
                        :disabled="isSubmitting">
                  <span v-if="!isSubmitting">Publicar Vacante</span>
                  <span v-else class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publicando...
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
    <FooterComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { EmpresarialService } from '@/services/empresarialService';
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import type { VacanteDTO } from '@/interfaces/VacantesDTO';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'CrearVacante',
  components: {
    HeaderComponent,
    FooterComponent
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      form: {
        nombre: '',
        descripcion: '',
        salario: 0,
        horario: '',
        fechaExpiracion: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 días después
        habilidadesRequeridas: '',
        ubicacion: '',
        tipoTrabajo: 'Remoto'
      } as Omit<VacanteDTO, 'id' | 'fechaPublicacion' | 'usuarioId' | 'cVs'>,
      isSubmitting: false,
      showSuccessMessage: false
    };
  },
  methods: {
    async submitForm() {
      this.isSubmitting = true;
      try {
        await EmpresarialService.crearVacante({
          ...this.form,
          fechaExpiracion: new Date(this.form.fechaExpiracion).toISOString()
        });

        this.showSuccessMessage = true;
        
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.router.go(-1);
        }, 4000);
        
      } catch (error) {
        console.error('Error al crear vacante:', error);
        alert('Ocurrió un problema al crear la vacante. Por favor, inténtalo de nuevo.');
      } finally {
        this.isSubmitting = false;
      }
    }
  }
});
</script>