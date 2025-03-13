<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
      <div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 class="text-3xl font-extrabold text-center text-blue-600 mb-6">Iniciar Sesión</h2>
  
        <form @submit.prevent="login" class="space-y-4">
          <!-- Email -->
          <div>
            <label class="block text-gray-700 font-medium">Correo electrónico</label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="tucorreo@email.com"
            />
          </div>
  
          <!-- Password -->
          <div>
            <label class="block text-gray-700 font-medium">Contraseña</label>
            <input
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
            />
          </div>
  
          <!-- Botón de login -->
          <button
            type="submit"
            class="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            :disabled="loading"
          >
            <svg v-if="loading" class="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24" fill="none">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <span>{{ loading ? "Cargando..." : "Iniciar Sesión" }}</span>
          </button>
        </form>
  
        <p class="text-sm text-gray-600 text-center mt-4">
          ¿No tienes cuenta?
          <router-link to="/register" class="text-blue-600 hover:underline">Regístrate</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const email = ref("");
  const password = ref("");
  const loading = ref(false);
  
  const login = async () => {
    loading.value = true;
    setTimeout(() => {
      console.log("Iniciando sesión con:", email.value, password.value);
      loading.value = false;
    }, 2000); // Simulación de carga
  };
  </script>
  