<template>
  <div class="flex bg-gray-100 min-h-screen">
    <SidebarComponent />

    <div class="flex-1 flex flex-col">
      <HeaderComponent />

      <div class="p-6">
        <h1 class="text-3xl font-bold text-blue-600 mb-6">Perfil de Usuario</h1>

        <div class="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center">
          <!-- Foto de perfil centrada y grande -->
          <div class="relative mb-6">
            <img :src="usuario.foto || 'https://via.placeholder.com/150'" class="w-32 h-32 rounded-full shadow-md object-cover mb-4" alt="Foto de perfil">
            <input type="file" @change="cargarFoto" class="absolute bottom-0 right-0 bg-blue-600 text-white px-2 py-1 rounded-full text-xs cursor-pointer" />
          </div>

          <h2 class="text-2xl font-semibold text-gray-700 mb-4">{{ usuario.nombre }}</h2>

          <!-- Información Personal -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-6">
            <div>
              <label class="block text-gray-700 font-medium">Correo Electrónico:</label>
              <input v-model="usuario.email" type="email" class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200" />
            </div>
            <div>
              <label class="block text-gray-700 font-medium">Teléfono:</label>
              <input v-model="usuario.telefono" type="text" class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200" />
            </div>
            <div>
              <label class="block text-gray-700 font-medium">Ubicación:</label>
              <input v-model="usuario.ubicacion" type="text" class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200" />
            </div>
          </div>

          <!-- Información Laboral y Educación -->
          <div class="bg-gray-50 p-6 rounded-lg shadow-inner w-full mb-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Información Laboral y Educación</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-gray-700 font-medium">Puesto Actual:</label>
                <input v-model="usuario.puesto" type="text" class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200" />
              </div>
              <div>
                <label class="block text-gray-700 font-medium">Empresa:</label>
                <input v-model="usuario.empresa" type="text" class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200" />
              </div>
              <div>
                <label class="block text-gray-700 font-medium">Título Profesional:</label>
                <input v-model="usuario.titulo" type="text" class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200" />
              </div>
              <div>
                <label class="block text-gray-700 font-medium">Universidad:</label>
                <input v-model="usuario.universidad" type="text" class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200" />
              </div>
            </div>
          </div>

          <!-- Redes Profesionales -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div>
              <label class="block text-gray-700 font-medium">LinkedIn:</label>
              <input v-model="usuario.linkedin" type="url" class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200" />
            </div>
            <div>
              <label class="block text-gray-700 font-medium">GitHub:</label>
              <input v-model="usuario.github" type="url" class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200" />
            </div>
          </div>

          <button @click="guardarPerfil" class="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Guardar Cambios
          </button>
        </div>

        <FooterComponent />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const usuario = ref({
      nombre: 'Juan Pérez',
      email: 'juanperez@example.com',
      telefono: '123-456-7890',
      ubicacion: 'Ciudad de México',
      foto: '',
      puesto: 'Desarrollador Full Stack',
      empresa: 'Tech Solutions',
      titulo: 'Ingeniería en Sistemas',
      universidad: 'Universidad Nacional',
      linkedin: 'https://www.linkedin.com/in/juanperez',
      github: 'https://github.com/juanperez'
    });

    const guardarPerfil = () => {
      alert('Perfil guardado con éxito');
    };

    const cargarFoto = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => (usuario.value.foto = reader.result);
        reader.readAsDataURL(file);
      }
    };

    return { usuario, guardarPerfil, cargarFoto };
  }
};
</script>

<style scoped>
input {
  border: 1px solid #ccc;
}
</style>
