<script setup>
import { ref, onMounted } from 'vue';
import SidebarComponent from '@/components/SidebarComponent.vue';
import { getRoles } from '@/services/api';

const roles = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchRoles = async () => {
  try {
    loading.value = true;
    roles.value = await getRoles();
  } catch (err) {
    error.value = 'Error al obtener los roles';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchRoles);
</script>

<template>
  <div class="flex">

    <SidebarComponent />


    <div class="min-h-screen bg-white py-10 w-full">
      <h1 class="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        Lista de Roles
      </h1>

 
      <div class="text-center mb-8">
        <button
          @click="() => alert('Abrir modal para agregar rol')"
          class="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Agregar Rol
        </button>
      </div>

   
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        <p class="text-blue-500 ml-4 text-lg">Cargando roles...</p>
      </div>

      <div v-else-if="error" class="text-red-500 text-center font-semibold">
        {{ error }}
      </div>

    
      <div v-else class="mx-4">
        <div class="overflow-x-auto rounded-lg">
          <table class="w-full table-auto border-collapse min-w-full">
            <thead class="bg-blue-100 text-gray-800">
              <tr>
                <th class="px-6 py-3 text-left font-semibold">ID</th>
                <th class="px-6 py-3 text-left font-semibold">Nombre</th>
                <th class="px-6 py-3 text-left font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="rol in roles" :key="rol.id" class="hover:bg-blue-50 transition-colors duration-200 even:bg-gray-50">
                <td class="px-6 py-4 border-b border-gray-200">{{ rol.id }}</td>
                <td class="px-6 py-4 border-b border-gray-200">{{ rol.nombre }}</td>
                <td class="px-6 py-4 border-b border-gray-200">
                  <div class="flex space-x-2 justify-center">
                    <button class="text-white bg-blue-400 hover:bg-blue-600 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      ✏️
                    </button>
                    <button class="text-white bg-red-400 hover:bg-red-600 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    
      <div v-if="roles.length === 0" class="text-center text-gray-500 py-6">
        No hay roles disponibles.
      </div>
    </div>
  </div>
</template>
