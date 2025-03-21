<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#568AEE] via-[#1563FB] to-[#003366]">
    <div class="bg-white p-8 rounded-2xl shadow-lg w-[35rem]">
      <div class="flex items-center justify-center mb-6">
        <h2 class="text-3xl font-extrabold text-blue-600">Iniciar Sesión</h2>
        <img :src="LogoGW" alt="Logo" class="w-12 h-12 ml-3">
      </div>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="block text-gray-700 font-medium">Correo electrónico</label>
          <input
            v-model="email"
            type="email"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ingresa tu correo"
            required
          />
          <p v-if="!email && submitted" class="text-red-500 text-sm">El correo electrónico es requerido</p>
        </div>

        <div>
          <label class="block text-gray-700 font-medium">Contraseña</label>
          <input
            v-model="password"
            type="password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="••••••••"
            required
          />
          <p v-if="!password && submitted" class="text-red-500 text-sm">La contraseña es requerida</p>
        </div>

        <button
          type="submit"
          class="w-full flex items-center justify-center bg-[#568AEE] text-white py-2 rounded-lg hover:bg-[#1563FB] transition"
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
import { loginUser } from "@/services/api";
import { useRouter } from "vue-router";
import LogoGW from "@/assets/img/logo.png";

const email = ref("");
const password = ref("");
const loading = ref(false);
const submitted = ref(false);
const router = useRouter();

const login = async () => {
  submitted.value = true;

  // Validar email y contraseña
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    alert("Por favor, ingresa un correo electrónico válido.");
    return;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!passwordRegex.test(password.value)) {
    alert("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.");
    return;
  }

  loading.value = true;

  try {
    const credentials = {
      correo: email.value,
      contraseña: password.value,
    };

    const response = await loginUser(credentials);
    localStorage.setItem("token", response.token); 
    alert("Inicio de sesión exitoso.");
    router.push("/");
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    alert("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
  } finally {
    loading.value = false;
  }
};
</script>