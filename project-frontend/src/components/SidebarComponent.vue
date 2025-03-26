<template>
  <div class="flex">

    <div
      :class="[
        'fixed sm:relative h-screen bg-blue-700 text-white flex flex-col shadow-xl transition-all duration-300 z-50',
        isOpen ? 'w-64' : 'w-20',
        isMobile ? 'left-0' : ''
      ]"
      v-show="!isMobile || isOpen"
    >
      
      <button 
        @click="toggleSidebar" 
        class="p-3 text-white hover:bg-blue-600 transition self-end flex items-center justify-center"
      >
        <span class="text-lg">{{ isOpen ? '⬅️' : '➡️' }}</span>
      </button>

     
      <div class="p-5 flex items-center gap-3 border-b border-blue-500">
        <div class="w-10 h-10 bg-white text-blue-700 flex items-center justify-center rounded-full font-bold">
          GW
        </div>
        <span v-if="isOpen" class="text-xl font-semibold">GetWork</span>
      </div>

   
      <nav class="flex-1 mt-4">
        <ul class="space-y-2">
          <li v-for="item in menuItems" :key="item.name">
            <router-link
              :to="item.path"
              class="flex items-center gap-4 px-4 py-3 hover:bg-blue-600 transition duration-300 rounded-lg mx-2"
              active-class="bg-white text-blue-700 font-bold"
            >
              <span class="text-lg">{{ item.icon }}</span>
              <span v-if="isOpen">{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

  
    <div class="flex-1 p-4 " :class="{ 'ml-2': isOpen && !isMobile }">
      <button 
        @click="toggleSidebar" 
        class="sm:hidden fixed top-5 left-5 bg-blue-700 text-white p-2 rounded-md z-50"
      >
        ☰
      </button>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isOpen = ref(true);
const isMobile = ref(false);

// Definir los elementos del menú con iconos
const menuItems = [
  { name: "Inicio", path: "/dashboard", icon: "🏠" },
  { name: "Usuarios", path: "/dashboard/usuarios", icon: "👤" },
  { name: "Vacantes", path: "/dashboard/vacantes", icon: "📄" },
  { name: "Categorías", path: "/dashboard/categorias", icon: "📂" },
];

// Función para detectar si es móvil
const checkScreen = () => {
  isMobile.value = window.innerWidth < 640;
  if (isMobile.value) isOpen.value = false;
};

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

// Detectar cambios en la pantalla
onMounted(() => {
  checkScreen();
  window.addEventListener("resize", checkScreen);
});
</script>