<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
</script>
<template>
    <HeaderComponent/>
    <div class="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-2xl border border-gray-200">
      <h1 class="text-3xl font-extrabold text-center text-blue-700 mb-6">Detalles de la Vacante</h1>
      
      <div v-if="vacante" class="space-y-6">
        <div class="bg-gray-100 p-4 rounded-lg">
          <p class="text-lg text-gray-700"><strong class="text-gray-900">Nombre:</strong> {{ vacante.nombre }}</p>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg">
          <p class="text-lg text-gray-700"><strong class="text-gray-900">Descripción:</strong> {{ vacante.descripcion }}</p>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg">
          <p class="text-lg text-gray-700"><strong class="text-gray-900">Salario:</strong> {{ vacante.salario.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }) }}</p>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg">
          <p class="text-lg text-gray-700"><strong class="text-gray-900">Horario:</strong> {{ vacante.horario }}</p>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg">
          <p class="text-lg text-gray-700"><strong class="text-gray-900">Ubicación:</strong> {{ vacante.ubicacion }}</p>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg">
          <p class="text-lg text-gray-700"><strong class="text-gray-900">Tipo de Trabajo:</strong> {{ vacante.tipoTrabajo }}</p>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg">
          <p class="text-lg text-gray-700"><strong class="text-gray-900">Fecha de Publicación:</strong> {{ new Date(vacante.fechaPublicacion).toLocaleDateString('es-MX') }}</p>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg">
          <p class="text-lg text-gray-700"><strong class="text-gray-900">Fecha de Expiración:</strong> {{ new Date(vacante.fechaExpiracion).toLocaleDateString('es-MX') }}</p>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg">
          <p class="text-lg text-gray-700"><strong class="text-gray-900">Habilidades Requeridas:</strong> {{ vacante.habilidadesRequeridas }}</p>
        </div>
        <div class="flex justify-center mt-6 space-x-4">
            <button @click="goBack" class="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md">Regresar</button>
            <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md">Postularse</button>   
        </div>


      </div>
      
      <div v-else-if="error" class="text-center text-red-500 font-semibold mt-6">
        <p>Error al cargar la vacante: {{ error }}</p>
      </div>
      
      <div v-else class="text-center text-gray-500 mt-6">
        <p>Cargando...</p>
      </div>
    </div>
    <FooterComponent/>
  </template>
  
  <script>
  import { getVacanteById } from "@/services/api.js";
  
  export default {
    name: "Vacante",
    data() {
      return {
        vacante: null,
        error: null,
      };
    },
    async created() {
      const id = this.$route.params.id;
      if (id) {
        await this.fetchVacante(id);
      } else {
        this.error = "No se proporcionó un ID de vacante.";
      }
    },
    methods: {
      async fetchVacante(id) {
        try {
          this.vacante = await getVacanteById(id);
        } catch (err) {
          this.error = err.message || "No se pudo cargar la vacante.";
        }
      },
      goBack() {
        this.$router.push('/');
    },
    }
  };
  </script>
  