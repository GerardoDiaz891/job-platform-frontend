<template>
  <HeaderComponent />
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <router-link 
        to="/empresarial/vacantes"
        class="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 group transition-colors"
      >
        <svg class="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        Volver a mis vacantes
      </router-link>
      <div class="max-w-3xl mx-auto">
        <!-- Encabezado con degradado -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 mb-8 text-white shadow-lg">
          <h1 class="text-2xl font-bold">Crear Nueva Vacante</h1>
          <p class="text-blue-100">Completa el formulario para publicar tu vacante</p>
        </div>

        <!-- Formulario -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <form @submit.prevent="submitForm" class="p-6 space-y-6">
            <!-- Nombre -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombre de la vacante*</label>
              <input 
                v-model="form.nombre" 
                required 
                class="form-input"
                placeholder="Ej: Desarrollador Frontend Senior"
              >
            </div>

            <!-- Descripción -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Descripción*</label>
              <textarea 
                v-model="form.descripcion" 
                required 
                rows="6" 
                class="form-textarea"
                placeholder="Describe las responsabilidades, requisitos y beneficios del puesto..."
              ></textarea>
            </div>

            <!-- Salario -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Salario*</label>
              <div class="relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">$</span>
                </div>
                <input 
                  v-model.number="form.salario" 
                  type="number" 
                  required 
                  class="form-input pl-7"
                  placeholder="0.00"
                >
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">MXN</span>
                </div>
              </div>
            </div>

            <!-- Horario -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Horario*</label>
              <input 
                v-model="form.horario" 
                required 
                class="form-input"
                placeholder="Ej: Lunes a Viernes, 9:00 am - 6:00 pm"
              >
            </div>

            <!-- Fecha Expiración -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Fecha de expiración*</label>
              <input 
                v-model="form.fechaExpiracion" 
                type="date" 
                required 
                class="form-input"
                :min="new Date().toISOString().split('T')[0]"
              >
            </div>

            <!-- Habilidades Requeridas -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Habilidades requeridas*</label>
              <input 
                v-model="form.habilidadesRequeridas" 
                required 
                class="form-input"
                placeholder="Ej: JavaScript, React, Trabajo en equipo"
              >
              <p class="mt-1 text-sm text-gray-500">Separa las habilidades con comas</p>
            </div>

            <!-- Ubicación -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ubicación*</label>
              <input 
                v-model="form.ubicacion" 
                required 
                class="form-input"
                placeholder="Ej: Ciudad de México (Remoto)"
              >
            </div>

            <!-- Tipo de Trabajo -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de trabajo*</label>
              <select 
                v-model="form.tipoTrabajo" 
                required 
                class="form-select"
              >
                <option value="Remoto">Remoto</option>
                <option value="Presencial">Presencial</option>
                <option value="Híbrido">Híbrido</option>
              </select>
            </div>

            <!-- Botones -->
            <div class="flex justify-end space-x-4 pt-4">
              <router-link 
                to="/empresarial/vacantes"
                class="btn-cancel"
              >
                Cancelar
              </router-link>
              <button 
                type="submit" 
                class="btn-submit"
                :disabled="isSubmitting"
              >
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
  </div>
  <FooterComponent />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { crearVacante } from '@/services/api';
import type { VacanteDTO } from '@/types/VacantesDTO';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

export default defineComponent({
  name: 'CrearVacante',
  components: {
    FooterComponent,
    HeaderComponent
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
      isSubmitting: false
    };
  },
  methods: {
    async submitForm() {
      this.isSubmitting = true;
      try {
        await crearVacante({
          ...this.form,
          fechaExpiracion: new Date(this.form.fechaExpiracion).toISOString()
        });
        
        this.$notify({
          title: 'Vacante creada',
          text: 'La vacante se ha publicado correctamente',
          type: 'success'
        });
        
        this.$router.push('/empresarial/vacantes');
      } catch (error) {
        console.error(error);
        this.$notify({
          title: 'Error',
          text: 'Ocurrió un problema al crear la vacante',
          type: 'error'
        });
      } finally {
        this.isSubmitting = false;
      }
    }
  }
});
</script>