<template>
  <HeaderComponent />
  <div class="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#568AEE] via-[#1563FB] to-[#003366]">
    <div class="bg-white px-6 py-8 rounded-2xl shadow-lg max-w-lg w-full">
      <div class="flex items-center justify-center mb-6">
        <h2 class="text-3xl font-extrabold text-blue-600">Subir CV</h2>
        <img :src="LogoGW" alt="Logo" class="w-12 h-12 ml-3" />
      </div>

      <form class="space-y-4" @submit.prevent="submitCV">
        <div>
          <label class="block text-gray-700 font-medium">Seleccionar archivo</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            @change="onFileSelected"
          />
        </div>

        <div v-if="selectedFile" class="text-gray-800 mt-2">
          <p><strong>Archivo seleccionado:</strong> {{ selectedFile.name }}</p>
          <div class="flex flex-wrap gap-2 mt-2">
            <button
              type="button"
              @click="removeFile"
              class="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition sm:w-full lg:w-auto"
            >
              Eliminar
            </button>
            <button
              type="button"
              @click="editFile"
              class="bg-yellow-500 text-white py-1 px-4 rounded-lg hover:bg-yellow-600 transition sm:w-full lg:w-auto"
            >
              Editar
            </button>
          </div>
        </div>

        <!-- Mostrar el ID de la vacante -->
        <div v-if="cvStore.vacanteId" class="text-red-800 mt-4">
          <p><strong>ID de la vacante:</strong> {{ cvStore.vacanteId }}</p>
        </div>

        <button
          type="submit"
          :disabled="!selectedFile"
          class="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {{ cvStore.isLoading ? 'Subiendo...' : 'Subir CV' }}
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
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useCVStore } from "@/stores/useCVStore"; // Accedemos al store

const route = useRoute();
const cvStore = useCVStore();
const selectedFile = ref(null);

onMounted(() => {
  // Establecemos el ID de la vacante desde los parámetros de la URL
  if (route.params.id) {
    cvStore.setVacanteId(route.params.id);
  }

  // Establecemos el ID del usuario de manera centralizada
  cvStore.setUsuarioId("7"); // Este valor debería venir del sistema de autenticación en un caso real
});

const onFileSelected = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validación del tamaño del archivo (máximo 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert("El archivo debe ser menor a 5MB.");
    return;
  }

  // Validación del formato del archivo
  const allowedExtensions = ["pdf", "docx"];
  const fileExtension = file.name.split(".").pop().toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    alert("Formato no permitido. Solo se aceptan archivos PDF o DOCX.");
    return;
  }

  selectedFile.value = file;
};

const removeFile = () => {
  selectedFile.value = null;
};

const editFile = () => {
  document.querySelector('input[type=file]').click();
};

const submitCV = async () => {
  if (!selectedFile.value) {
    return alert("Por favor, selecciona un archivo.");
  }

  if (!cvStore.usuarioId || !cvStore.vacanteId) {
    return alert("IDs de usuario o vacante no configurados. Verifica antes de enviar.");
  }

  // Llamamos al método uploadCV desde el store
  await cvStore.uploadCV(selectedFile.value);

  // Mostramos mensajes de éxito o error
  if (cvStore.successMessage) {
    alert(cvStore.successMessage);
    removeFile();
  }
  if (cvStore.error) {
    alert(cvStore.error);
  }
};
</script>

<style scoped>
button:disabled {
  cursor: not-allowed;
}
</style>
