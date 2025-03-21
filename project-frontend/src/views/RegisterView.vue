<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#568AEE] via-[#1563FB] to-[#003366]">
    <div class="bg-white p-8 rounded-2xl shadow-lg w-[35rem]">
      <div class="flex items-center justify-center mb-6">
        <h2 class="text-3xl font-extrabold text-blue-600">Regístrate</h2>
        <img :src="LogoGW" alt="Logo" class="w-12 h-12 ml-3">
      </div>

      <form @submit.prevent="register" class="space-y-4">
        <div>
          <label class="block text-gray-700 font-medium">Nombre</label>
          <input
            v-model="name"
            type="text"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ingresa tu nombre"
            required
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium">Correo electrónico</label>
          <input
            v-model="email"
            type="email"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ingresa tu correo"
            required
          />
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
        </div>

        <div>
          <label class="block text-gray-700 font-medium">Confirmar Contraseña</label>
          <input
            v-model="confirmPassword"
            type="password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="••••••••"
            required
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium">Rol</label>
          <select
            v-model="selectedRole"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="2">Empresarial</option>
            <option value="3">Postulante</option>
          </select>
        </div>

        <!-- Campos adicionales para el rol "Empresarial" -->
        <div v-if="selectedRole === '2'">
          <div>
            <label class="block text-gray-700 font-medium">Nombre de la empresa</label>
            <input
              v-model="nombreEmpresa"
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ingresa el nombre de la empresa"
              required
            />
          </div>

          <div>
            <label class="block text-gray-700 font-medium">Tipo de empresa</label>
            <input
              v-model="tipoEmpresa"
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ingresa el tipo de empresa"
              required
            />
          </div>

          <div>
            <label class="block text-gray-700 font-medium">Dirección</label>
            <input
              v-model="direccion"
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ingresa la dirección"
              required
            />
          </div>

          <div>
            <label class="block text-gray-700 font-medium">Teléfono</label>
            <input
              v-model="telefono"
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ingresa el teléfono"
              required
            />
          </div>

          <div>
            <label class="block text-gray-700 font-medium">Sitio web</label>
            <input
              v-model="sitioWeb"
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ingresa el sitio web"
              required
            />
          </div>

          <div>
            <label class="block text-gray-700 font-medium">Descripción de la empresa</label>
            <textarea
              v-model="descripcionEmpresa"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ingresa la descripción de la empresa"
              required
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          class="w-full flex items-center justify-center bg-[#568AEE] text-white py-2 rounded-lg hover:bg-[#1563FB] transition"
          :disabled="loading"
        >
          <span>{{ loading ? "Registrando..." : "Registrarse" }}</span>
        </button>
      </form>
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