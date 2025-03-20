<template>
    <div>
      <h2>Vacantes Disponibles</h2>
      <p v-if="vacantes.length === 0">No hay vacantes disponibles en este momento.</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  
      <ul>
        <li v-for="vacante in vacantes" :key="vacante.id">
          <h3>{{ vacante.nombre }}</h3>
          <p>{{ vacante.descripcion }}</p>
          <p>Salario: ${{ vacante.salario }}</p>
          <p>Horario: {{ vacante.horario }}</p>
          <p>Ubicación: {{ vacante.ubicacion }}</p>
          <p>Tipo de trabajo: {{ vacante.tipoTrabajo }}</p>
          <p>Fecha de publicación: {{ vacante.fechaPublicacion | formatDate }}</p>
          <p>Fecha de expiración: {{ vacante.fechaExpiracion | formatDate }}</p>
        </li>
      </ul>
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
  
  <style scoped>
  h2 {
    color: #4A90E2;
  }
  
  ul {
    list-style-type: none;
  }
  
  li {
    margin-bottom: 20px;
    padding: 10px;
    background-color: #f4f4f4;
    border-radius: 5px;
  }
  
  h3 {
    color: #333;
  }
  
  p {
    margin: 5px 0;
  }
  
  .error-message {
    color: red;
    font-weight: bold;
  }
  </style>
  