<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 p-4">
    <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl">
      <!-- Encabezado con logo y título -->
      <div class="flex flex-col items-center mb-8">
        <img :src="LogoGW" alt="Logo" class="w-20 h-20 mb-4">
        <h1 class="text-3xl font-bold text-gray-800">Crea tu cuenta</h1>
        <p class="text-gray-500 mt-2">Completa el formulario según tu perfil</p>
      </div>

      <form @submit.prevent="register" class="space-y-4">
        <!-- Sección común a todos los roles -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Nombre -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <input
                v-model="name"
                type="text"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Juan Pérez"
                required
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <input
                v-model="email"
                type="email"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="tu@correo.com"
                required
              />
            </div>
          </div>

          <!-- Contraseña -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <input
                v-model="password"
                type="password"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="••••••••"
                required
              />
            </div>
            <p class="mt-1 text-xs text-gray-500">Mínimo 8 caracteres, 1 mayúscula y 1 número</p>
          </div>

          <!-- Confirmar Contraseña -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <input
                v-model="confirmPassword"
                type="password"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <!-- Rol -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de cuenta</label>
            <select
              v-model="selectedRole"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            >
              <option value="3">Postulante</option>
              <option value="2">Empresarial</option>
            </select>
          </div>
        </div>

        <!-- Campos adicionales para Empresas -->
        <div v-if="selectedRole === '2'" class="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
          <h3 class="text-lg font-semibold text-blue-800 mb-4">Información de la empresa</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Nombre Empresa -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombre de la empresa</label>
              <input
                v-model="nombreEmpresa"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Mi Empresa S.A."
                required
              />
            </div>

            <!-- Tipo Empresa -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de empresa</label>
              <select
                v-model="tipoEmpresa"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              >
                <option value="">Seleccione un tipo</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Comercio">Comercio</option>
                <option value="Servicios">Servicios</option>
                <option value="Manufactura">Manufactura</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <!-- Dirección -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
              <input
                v-model="direccion"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Av. Principal 123"
                required
              />
            </div>

            <!-- Teléfono -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                v-model="telefono"
                type="tel"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="+51 987654321"
                required
              />
            </div>

            <!-- Sitio Web -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Sitio web</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <input
                  v-model="sitioWeb"
                  type="url"
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="https://www.miempresa.com"
                  required
                />
              </div>
            </div>
          </div>

          <!-- Descripción -->
          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Descripción de la empresa</label>
            <textarea
              v-model="descripcionEmpresa"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              rows="3"
              placeholder="Breve descripción de las actividades de la empresa..."
              required
            ></textarea>
          </div>
        </div>

        <!-- Botón de registro -->
        <div class="pt-4">
          <button
            type="submit"
            class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            :disabled="loading"
            :class="{'opacity-75 cursor-not-allowed': loading}"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Creando cuenta...' : 'Registrarse' }}
          </button>
        </div>
      </form>

      <!-- Enlace a login -->
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          ¿Ya tienes una cuenta?
          <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-500 hover:underline">Inicia sesión</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { registerUser } from "@/services/api";
import { useRouter } from "vue-router";
import LogoGW from "@/assets/img/logo.png";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const selectedRole = ref("3"); // Valor por defecto: Postulante
const nombreEmpresa = ref("");
const tipoEmpresa = ref("");
const direccion = ref("");
const telefono = ref("");
const sitioWeb = ref("");
const descripcionEmpresa = ref("");
const loading = ref(false);
const submitted = ref(false);
const router = useRouter();

const register = async () => {
  submitted.value = true;

  // Validaciones
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(name.value)) {
    alert("El nombre solo puede contener letras y espacios.");
    return;
  }

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

  if (password.value !== confirmPassword.value) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  loading.value = true;

  try {
    const userData = {
      id: 0,
      nombre: name.value,
      correo: email.value,
      contraseña: password.value,
      ConfirmarContraseña: confirmPassword.value,
      idRol: parseInt(selectedRole.value),
      nombreRol: selectedRole.value === "2" ? "Empresarial" : "Postulante",
      nombreEmpresa: selectedRole.value === "2" ? nombreEmpresa.value : "",
      tipoEmpresa: selectedRole.value === "2" ? tipoEmpresa.value : "",
      direccion: selectedRole.value === "2" ? direccion.value : "",
      telefono: selectedRole.value === "2" ? telefono.value : "",
      sitioWeb: selectedRole.value === "2" ? sitioWeb.value : "",
      descripcionEmpresa: selectedRole.value === "2" ? descripcionEmpresa.value : "",
      idCV: 0,
    };

    const response = await registerUser(userData);
    alert("Usuario registrado exitosamente.");
    router.push("/login");
  } catch (error) {
    if (error.response && error.response.data) {
      console.error("Error del servidor:", error.response.data);
      alert(`Error al registrar el usuario: ${error.response.data}`);
    } else {
      console.error("Error al registrar el usuario:", error);
      alert("Error al registrar el usuario. Por favor, inténtalo de nuevo.");
    }
  } finally {
    loading.value = false;
  }
};
</script>