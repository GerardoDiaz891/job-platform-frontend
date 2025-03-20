<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <!-- Header -->
    <HeaderComponent />
    
    <div class="flex-1 p-6">
      <h1 class="text-3xl font-bold text-blue-600 mb-6">Perfil de Usuario</h1>
      <div class="bg-white shadow-lg rounded-xl p-6">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Información Personal</h2>
        
        <div class="flex items-center space-x-4 mb-6">
          <img :src="usuario.foto || 'https://via.placeholder.com/150'" class="w-24 h-24 rounded-full shadow-md" alt="Foto de perfil">
          <div>
            <label class="block text-gray-700 font-medium">Subir Foto:</label>
            <input type="file" @change="cargarFoto" class="mt-2">
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-gray-700 font-medium">Nombre:</label>
            <input v-model="usuario.nombre" type="text" class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200" />
          </div>
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
      </div>
      
      <div class="bg-white shadow-lg rounded-xl p-6 mt-6">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Información Laboral</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-gray-700 font-medium">Puesto Actual:</label>
            <input v-model="usuario.puesto" type="text" class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200" />
          </div>
          <div>
            <label class="block text-gray-700 font-medium">Empresa:</label>
            <input v-model="usuario.empresa" type="text" class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200" />
          </div>
          <div>
            <label class="block text-gray-700 font-medium">Experiencia (años):</label>
            <input v-model="usuario.experiencia" type="number" class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200" />
          </div>
          <div>
            <label class="block text-gray-700 font-medium">Habilidades:</label>
            <textarea v-model="usuario.habilidades" rows="3" class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"></textarea>
          </div>
        </div>
      </div>
      
      <div class="bg-white shadow-lg rounded-xl p-6 mt-6">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Educación</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      
      <div class="bg-white shadow-lg rounded-xl p-6 mt-6">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Redes Profesionales</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-gray-700 font-medium">LinkedIn:</label>
            <input v-model="usuario.linkedin" type="url" class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200" />
          </div>
          <div>
            <label class="block text-gray-700 font-medium">GitHub:</label>
            <input v-model="usuario.github" type="url" class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200" />
          </div>
        </div>
      </div>
      
      <button @click="guardarPerfil" class="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Guardar Cambios
      </button>
    </div>
    
    <!-- Footer -->
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  components: {
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      usuario: {
        foto: '',
        nombre: '',
        email: '',
        telefono: '',
        ubicacion: '',
        puesto: '',
        empresa: '',
        experiencia: '',
        habilidades: '',
        titulo: '',
        universidad: '',
        linkedin: '',
        github: ''
      }
    };
  },
  methods: {
    cargarFoto(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.usuario.foto = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    guardarPerfil() {
      console.log('Perfil guardado', this.usuario);
    }
  }
};
</script>

<style scoped>
input, textarea {
  border: 1px solid #ccc;
  padding: 8px;
}
</style>