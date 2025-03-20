<template>
    <p v-if="vacantes.length === 0" class="text-gray-500 text-center text-sm">No hay vacantes disponibles en este momento.</p>
    <p v-if="errorMessage" class="text-red-600 font-semibold text-center text-sm">{{ errorMessage }}</p>

    <div v-for="vacante in vacantes" :key="vacante.id" class="bg-white shadow-lg rounded-xl p-4 max-w-sm w-full mb-4 border border-gray-200">
      
      <div class="flex justify-center mb-3">
        <img src="https://img.pikbest.com/png-images/20241118/job-logo-design-png-_11101892.png!sw800" alt="Company Logo" class="w-16 h-16 object-contain">
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
          <p><strong>Publicado:</strong> {{ vacante.fechaPublicacion | formatDate }}</p>
          <p><strong>Expira:</strong> {{ vacante.fechaExpiracion | formatDate }}</p>
        </div>   
        <button class="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 text-sm rounded-md font-medium transition duration-200">
          Contactar
        </button>
      </div>
    </div>
  
</template>

<script>
import { getVacantes } from "@/services/api.js";

export default {
  data() {
    return {
      vacantes: [],
      errorMessage: '',
    };
  },
  async mounted() {
    try {
      this.vacantes = await getVacantes();
    } catch (error) {
      this.errorMessage = "Hubo un error al cargar las vacantes.";
      console.error("Error al cargar las vacantes:", error);
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>
