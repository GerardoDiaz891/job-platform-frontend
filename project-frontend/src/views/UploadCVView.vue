<template>
  <HeaderComponent />
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#568AEE] via-[#1563FB] to-[#003366]">
    <div class="bg-white p-10 rounded-2xl shadow-lg w-[35rem] ">
      <div class="flex items-center justify-center mb-6">
        <h2 class="text-3xl font-extrabold text-blue-600">Subir CV</h2>
        <img :src="LogoGW" alt="Logo" class="w-12 h-12 ml-3" />
      </div>

      <form class="space-y-4" @submit.prevent="submitCV">
        <!-- Archivo CV -->
        <div>
          <label class="block text-gray-700 font-medium">Seleccionar archivo</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            ref="fileInput"
            @change="handleFileChange"
          />
        </div>

        <!-- Nombre del archivo cargado -->
        <div v-if="fileName" class="text-gray-800 mt-2">
          <p><strong>Archivo seleccionado:</strong> {{ fileName }}</p>
          <div class="flex space-x-4 mt-2">
            <button
              type="button"
              @click="removeFile"
              class="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition"
            >
              Eliminar
            </button>
            <button
              type="button"
              @click="editFile"
              class="bg-yellow-500 text-white py-1 px-4 rounded-lg hover:bg-yellow-600 transition"
            >
              Editar
            </button>
          </div>
        </div>

        <!-- Botón de subir -->
        <button
          type="submit"
          :disabled="!fileName"
          class="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          Subir CV
        </button>
      </form>
    </div>
  </div>
  <FooterComponent />
</template>

<script setup>
import LogoGW from "@/assets/img/logo.png";
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import { ref } from "vue";

const fileInput = ref(null);
const fileName = ref("");

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    fileName.value = file.name;
  }
};

const removeFile = () => {
  fileInput.value.value = ""; // Clear the file input
  fileName.value = ""; // Clear the file name display
};

const editFile = () => {
  fileInput.value.click(); // Trigger the file input to reselect a file
};

const submitCV = () => {
  // Aquí puedes agregar la lógica para subir el archivo al backend
  alert("CV subido con éxito!");
};
</script>
