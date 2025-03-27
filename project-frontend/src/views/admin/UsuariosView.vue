<template>
    <div class="flex">
     
      <SidebarComponent />
  
      
      <div class="min-h-screen bg-white py-10 w-full">
        <h1 class="text-3xl font-extrabold text-gray-800 mb-8 text-center">
          Lista de Usuarios
        </h1>
  
       
        <div class="text-center mb-8">
          <button
            @click="openAddUserModal"
            class="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Agregar Usuario
          </button>
        </div>
  
        
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          <p class="text-blue-500 ml-4 text-lg">Cargando usuarios...</p>
        </div>
  
        
        <div v-else-if="error" class="text-red-500 text-center font-semibold">
          {{ error }}
        </div>
  
        
        <div v-else class="mx-4">
          <div class="overflow-x-auto rounded-lg">
            <table class="w-full table-auto border-collapse min-w-full">
              <thead class="bg-blue-100 text-gray-800">
                <tr>
                  <th class="px-6 py-3 text-left font-semibold">Nombre</th>
                  <th class="px-6 py-3 text-left font-semibold">Correo</th>
                  <th class="px-6 py-3 text-left font-semibold">Empresa</th>
                  <th class="px-6 py-3 text-left font-semibold">Tipo</th>
                  <th class="px-6 py-3 text-left font-semibold">Teléfono</th>
                  <th class="px-6 py-3 text-left font-semibold">Sitio Web</th>
                  <th class="px-6 py-3 text-left font-semibold">Descripción</th>
                  <th class="px-6 py-3 text-left font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="usuario in usuarios"
                  :key="usuario.id"
                  class="hover:bg-blue-50 transition-colors duration-200 even:bg-gray-50"
                >
                  <td class="px-6 py-4 border-b border-gray-200">
                    <span class="font-semibold text-gray-800">{{ usuario.nombre }}</span>
                    <span class="text-sm text-gray-500 block">{{ usuario.nombreRol }}</span>
                  </td>
                  <td class="px-6 py-4 border-b border-gray-200">{{ usuario.correo }}</td>
                  <td class="px-6 py-4 border-b border-gray-200">
                    <strong>{{ usuario.nombreEmpresa }}</strong><br />
                    <span class="text-sm text-gray-500">{{ usuario.direccion }}</span>
                  </td>
                  <td class="px-6 py-4 border-b border-gray-200">{{ usuario.tipoEmpresa }}</td>
                  <td class="px-6 py-4 border-b border-gray-200">{{ usuario.telefono }}</td>
                  <td class="px-6 py-4 border-b border-gray-200">
                    <a
                      v-if="usuario.sitioWeb"
                      :href="usuario.sitioWeb"
                      target="_blank"
                      class="text-blue-500 hover:underline"
                    >
                      🌐 Visitar
                    </a>
                    <span v-else class="text-gray-500">No disponible</span>
                  </td>
                  <td class="px-6 py-4 border-b border-gray-200">{{ usuario.descripcionEmpresa }}</td>
                  <td class="px-6 py-4 border-b border-gray-200">
                    <div class="flex space-x-2 justify-center">
                      <button class="text-white bg-blue-400 hover:bg-blue-600 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        ✏️
                      </button>
                      <button class="text-white bg-red-400 hover:bg-red-600 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  
        
        <div v-if="usuarios.length === 0" class="text-center text-gray-500 py-6">
          No hay usuarios disponibles.
        </div>
      </div>
    </div>
  
    <!-- Modal o formulario para agregar usuario (opcional) -->
    <!-- Este es solo un ejemplo, puedes implementar un modal o un formulario según lo necesites -->
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import SidebarComponent from "@/components/SidebarComponent.vue";
  import { getUsuarios } from "@/services/api";
  
  // Estado de los usuarios y carga
  const usuarios = ref([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  
  // Función para obtener los usuarios
  const fetchUsuarios = async () => {
    try {
      usuarios.value = await getUsuarios();
    } catch (err) {
      error.value = "Error al cargar usuarios. Por favor, intenta de nuevo.";
    } finally {
      loading.value = false;
    }
  };
  
  // Función para abrir el modal o formulario para agregar un usuario
  const openAddUserModal = () => {
    alert("Aquí se abriría el modal para agregar un usuario.");
  };
  
  // Cargar usuarios al montar el componente
  onMounted(() => {
    fetchUsuarios();
  });
  </script>
  