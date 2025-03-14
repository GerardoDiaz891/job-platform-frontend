<template>
  <div class="flex">
    
    <div 
      :class="['h-screen bg-blue-600 text-white flex flex-col shadow-lg transition-all duration-300', isOpen ? 'w-64' : 'w-30']"
    >
      
      <button 
        @click="isOpen = !isOpen" 
        class="p-2 text-white hover:bg-blue-500 transition self-end"
      >
        <span v-if="isOpen">⬅️</span>
        <span v-else>➡️</span>
      </button>

      
      <div class="p-6 text-2xl font-bold flex items-center gap-2 border-b border-blue-500" v-if="isOpen">
        <span class="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold">
          GW
        </span>
        GetWork
      </div>

      <!-- Menú -->
      <nav class="flex-1 mt-4">
        <ul>
          <li v-for="item in menuItems" :key="item.name">
            <router-link 
              :to="item.path" 
              class="flex items-center gap-3 px-6 py-3 text-white hover:bg-blue-500 transition duration-300 rounded-lg mx-2"
              active-class="bg-white text-blue-600 font-bold"
            >
              <span class="w-2 h-2 bg-white rounded-full"></span>
              <span v-if="isOpen">{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

   
    
  </div>
</template>

<script setup>
import { ref } from "vue";
const isOpen = ref(true);

const menuItems = [
  { name: "Inicio", path: "/dashboard" },
  { name: "Usuarios", path: "/dashboard/usuarios" },
  { name: "Vacantes", path: "/dashboard/vacantes" },
  { name: "Categorías", path: "/dashboard/categorias" },
];
</script>
