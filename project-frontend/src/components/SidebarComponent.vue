<template>
  <div class="w-64 bg-gray-800 text-white min-h-screen p-4">
    <div class="flex items-center space-x-2 p-4 border-b border-gray-700">
      <h1 class="text-xl font-bold">Panel de Administración</h1>
    </div>
    
    <nav class="mt-6">
      
      <router-link 
        to="/admin/usuarios"
        class="block py-2 px-4 rounded hover:bg-gray-700 transition mb-2"
        active-class="bg-blue-600"
      >
        👥 Usuarios
      </router-link>
      
      <router-link 
        to="/admin/roles"
        class="block py-2 px-4 rounded hover:bg-gray-700 transition mb-2"
        active-class="bg-blue-600"
      >
        🔑 Roles
      </router-link>
      
      <button 
        @click="logout"
        class="w-full text-left block py-2 px-4 rounded hover:bg-gray-700 transition mt-8"
      >
        🚪 Cerrar Sesión
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
  router.push('/login');
};
</script>