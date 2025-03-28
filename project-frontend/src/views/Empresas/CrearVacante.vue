<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-6">Crear Nueva Vacante</h1>
      
      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Nombre -->
        <div>
          <label class="block mb-1">Nombre de la vacante*</label>
          <input v-model="form.nombre" required class="w-full p-2 border rounded">
        </div>
  
        <!-- Descripción -->
        <div>
          <label class="block mb-1">Descripción*</label>
          <textarea v-model="form.descripcion" required rows="4" class="w-full p-2 border rounded"></textarea>
        </div>
  
        <!-- Salario -->
        <div>
          <label class="block mb-1">Salario*</label>
          <input v-model.number="form.salario" type="number" required class="w-full p-2 border rounded">
        </div>
  
        <!-- Horario -->
        <div>
          <label class="block mb-1">Horario* (ej: Lunes a Viernes, 9am-6pm)</label>
          <input v-model="form.horario" required class="w-full p-2 border rounded">
        </div>
  
        <!-- Fecha Expiración -->
        <div>
          <label class="block mb-1">Fecha de expiración*</label>
          <input v-model="form.fechaExpiracion" type="date" required class="w-full p-2 border rounded">
        </div>
  
        <!-- Habilidades Requeridas -->
        <div>
          <label class="block mb-1">Habilidades requeridas* (separadas por comas)</label>
          <input v-model="form.habilidadesRequeridas" required class="w-full p-2 border rounded">
        </div>
  
        <!-- Ubicación -->
        <div>
          <label class="block mb-1">Ubicación*</label>
          <input v-model="form.ubicacion" required class="w-full p-2 border rounded">
        </div>
  
        <!-- Tipo de Trabajo -->
        <div>
          <label class="block mb-1">Tipo de trabajo*</label>
          <select v-model="form.tipoTrabajo" required class="w-full p-2 border rounded">
            <option value="Remoto">Remoto</option>
            <option value="Presencial">Presencial</option>
            <option value="Híbrido">Híbrido</option>
          </select>
        </div>
  
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
          Publicar Vacante
        </button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { crearVacante } from '@/services/api';
  import type { VacanteDTO } from '@/types/VacantesDTO';
  
  export default defineComponent({
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
        } as Omit<VacanteDTO, 'id' | 'fechaPublicacion' | 'usuarioId' | 'cVs'>
      };
    },
    methods: {
      async submitForm() {
        try {
          await crearVacante({
            ...this.form,
            fechaExpiracion: new Date(this.form.fechaExpiracion).toISOString()
          });
          alert('Vacante creada con éxito!');
          this.$router.push('/empresarial/vacantes');
        } catch (error) {
          alert('Error al crear la vacante');
          console.error(error);
        }
      }
    }
  });
  </script>