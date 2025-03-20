
<template>
    <div class="flex bg-gray-100 min-h-screen">
      <SidebarComponent />
      
      <div class="flex-1 flex flex-col">
        <HeaderComponent />
        
        <div class="p-6">
          <h1 class="text-3xl font-bold text-blue-600 mb-6">Perfil de Usuario</h1>
  
          <div class="bg-white shadow-lg rounded-xl p-6">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">Información Personal</h2>
            
            <!-- Sección de Fotografía -->
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
  
          <!-- Sección de Información Laboral -->
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
  
          <!-- Sección de Educación -->
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
  
          <!-- Redes Profesionales -->
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
  
        <FooterComponent />
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  
  export default {
    setup() {
      const usuario = ref({
        nombre: "Juan Pérez",
        email: "juanperez@example.com",
        telefono: "123-456-7890",
        ubicacion: "Ciudad de México",
        foto: "", 
        puesto: "Desarrollador Full Stack",
        empresa: "Tech Solutions",
        experiencia: 5,
        habilidades: "JavaScript, Vue.js, Node.js, SQL",
        titulo: "Ingeniería en Sistemas",
        universidad: "Universidad Nacional",
        linkedin: "https://www.linkedin.com/in/juanperez",
        github: "https://github.com/juanperez"
      });
  
      const guardarPerfil = () => {
        console.log("Perfil actualizado:", usuario.value);
        alert("Perfil guardado con éxito");
      };
  
      const cargarFoto = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            usuario.value.foto = reader.result;
          };
          reader.readAsDataURL(file);
        }
      };
  
      return { usuario, guardarPerfil, cargarFoto };
    }
  };
  </script>
  
  <style scoped>
  input, textarea {
    border: 1px solid #ccc;
  }
  </style>
  