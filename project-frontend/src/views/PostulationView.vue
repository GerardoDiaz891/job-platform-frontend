<template>
  <HeaderComponent />
  <div class="min-h-screen bg-gradient-to-br from-[#568AEE] via-[#1563FB] to-[#003366] p-10">
    <div class="grid grid-cols-3 gap-5 max-w-7xl mx-auto">
      <!-- Formulario para agregar postulaciones -->
      <div class="col-span-1 bg-white p-6 rounded-lg shadow-lg h-[25rem] flex flex-col justify-center">
        <h2 class="text-2xl font-bold text-blue-600 mb-4">Agregar Postulación</h2>
        <form @submit.prevent="agregarPostulacion" class="space-y-4">
          <div>
            <label class="block text-gray-700 font-medium">Título</label>
            <input v-model="nuevoTitulo" type="text" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
          <div>
            <label class="block text-gray-700 font-medium">Empresa</label>
            <input v-model="nuevaEmpresa" type="text" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Agregar</button>
        </form>
      </div>

      <!-- Lista de postulaciones -->
      <div class="col-span-2 bg-white p-6 rounded-lg shadow-lg h-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-3xl font-extrabold text-blue-600">Postulaciones</h2>
          <p class="text-gray-700 font-medium">Total: {{ postulaciones.length }}</p>
        </div>

        <div v-if="postulaciones.length" class="space-y-4">
          <div v-for="postulacion in postulaciones" :key="postulacion.id" class="p-4 border rounded-lg shadow-sm">
            <h3 class="text-xl font-bold text-gray-800">{{ postulacion.titulo }}</h3>
            <p class="text-gray-600">{{ postulacion.nombre }}</p>
            <p class="text-gray-600 text-sm">{{ postulacion.fecha }}</p>
            <div class="flex space-x-4 mt-2">
              <button class="bg-blue-600 text-white py-1 px-4 rounded-lg hover:bg-blue-700 transition" @click="verDetalles(postulacion)">Ver Detalles</button>
              <button class="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition" @click="eliminarPostulacion(postulacion.id)">Eliminar</button>
            </div>
          </div>
        </div>

        <p v-else class="text-gray-600 text-center">No hay postulaciones disponibles.</p>
      </div>
    </div>
  </div>

  <!-- Modal para ver detalles de postulación -->
  <div v-if="mostrarModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-[30rem]">
      <h2 class="text-2xl font-bold text-blue-600 mb-4">Detalles de la Postulación</h2>
      <p><strong>Título:</strong> {{ postulacionSeleccionada.titulo }}</p>
      <p><strong>Nombre:</strong> {{ postulacionSeleccionada.nombre }}</p>
      <p><strong>Fecha:</strong> {{ postulacionSeleccionada.fecha }}</p>
      <p v-if="postulacionSeleccionada.cv"><strong>CV:</strong> <a :href="postulacionSeleccionada.cv" target="_blank" class="text-blue-600 underline">Ver CV</a></p>
      <div class="flex justify-end space-x-4 mt-4">
        <button class="bg-gray-500 text-white py-1 px-4 rounded-lg hover:bg-gray-600 transition" @click="cerrarModal">Cerrar</button>
      </div>
    </div>
  </div>

  <FooterComponent />
</template>

<script setup>
import LogoGW from "@/assets/img/logo.png";
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import { ref } from "vue";

const postulaciones = ref([
  { id: 1, titulo: "Desarrollador Frontend", nombre: "Marco Hau Pech", fecha: "12/03/2025", cv: "#" },
  { id: 2, titulo: "Diseñador UX/UI", nombre: "Emiliano Esparza Medina", fecha: "10/03/2025", cv: "#" }
]);

const nuevoTitulo = ref("");
const nuevaEmpresa = ref("");
const mostrarModal = ref(false);
const postulacionSeleccionada = ref(null);

const verDetalles = (postulacion) => {
  postulacionSeleccionada.value = postulacion;
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
  postulacionSeleccionada.value = null;
};

const eliminarPostulacion = (id) => {
  postulaciones.value = postulaciones.value.filter(postulacion => postulacion.id !== id);
};

const agregarPostulacion = () => {
  if (nuevoTitulo.value && nuevaEmpresa.value) {
    postulaciones.value.push({
      id: Date.now(),
      titulo: nuevoTitulo.value,
      empresa: nuevaEmpresa.value,
      fecha: new Date().toLocaleDateString(),
      cv: "#"
    });
    nuevoTitulo.value = "";
    nuevaEmpresa.value = "";
  }
};
</script>

<style scoped>
button {
  transition: all 0.2s ease-in-out;
}
</style>
