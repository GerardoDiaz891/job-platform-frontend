<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <SidebarComponent />

    <!-- Contenido Principal -->
    <div class="flex-1 p-6 bg-gray-100">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Usuarios</h1>
        <button
          @click="openAddUserModal"
          class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          + Agregar Usuario
        </button>
      </div>

      <!-- Tabla de Usuarios -->
      <div v-if="loading" class="text-center text-gray-500">Cargando...</div>
      <div v-else-if="error" class="text-center text-red-500">
        {{ error }}
      </div>
      <div v-else>
        <table class="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead class="bg-gray-200">
            <tr>
              <th class="py-2 px-4 text-left">ID</th>
              <th class="py-2 px-4 text-left">Nombre</th>
              <th class="py-2 px-4 text-left">Correo</th>
              <th class="py-2 px-4 text-left">Rol</th>
              <th class="py-2 px-4 text-left">Empresa</th>
              <th class="py-2 px-4 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
  <tr
    v-for="usuario in usuarios"
    :key="usuario.id"
    class="hover:bg-gray-100"
  >
    <td class="py-2 px-4">{{ usuario.id }}</td>
    <td class="py-2 px-4">{{ usuario.nombre }}</td>
    <td class="py-2 px-4">{{ usuario.correo }}</td>
    <td class="py-2 px-4">{{ usuario.nombreRol }}</td>
    <td class="py-2 px-4">{{ usuario.nombreEmpresa || "N/A" }}</td>
    <td class="py-2 px-4">
      <button
      @click="editarUsuario(usuario)"
        class="ml-2 text-white bg-blue-400 hover:bg-blue-600 py-2 px-4 rounded-md"
       >
        ✏️ Editar
        </button>

      <button
        @click="eliminarUsuario(usuario.id)"
        class="text-white bg-red-400 hover:bg-red-600 py-2 px-4 rounded-md"
      >
        🗑️ Eliminar
      </button>

    </td>
  </tr>
</tbody>
        </table>
      </div>

      <!-- Modal para Agregar Usuario -->
      <div
        v-if="mostrarModal"
        class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <h2 class="text-2xl font-bold mb-4">Agregar Usuario</h2>

          <form @submit.prevent="agregarUsuario">
            <div class="mb-4">
              <label class="block text-gray-700">Nombre</label>
              <input
                v-model="nuevoUsuario.nombre"
                type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none"
                required
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700">Correo</label>
              <input
                v-model="nuevoUsuario.correo"
                type="email"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none"
                required
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700">Contraseña</label>
              <input
                v-model="nuevoUsuario.contraseña"
                type="password"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none"
                required
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700">Confirmar Contraseña</label>
              <input
                v-model="nuevoUsuario.confirmarContraseña"
                type="password"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none"
                required
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700">Empresa</label>
              <input
                v-model="nuevoUsuario.nombreEmpresa"
                type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700">Tipo de Empresa</label>
              <input
                v-model="nuevoUsuario.tipoEmpresa"
                type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>

            <!-- Selección de Rol -->
            <div class="mb-4">
              <label class="block text-gray-700">Rol</label>
              <select
                v-model="nuevoUsuario.idRol"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none"
                required
              >
                <option value="1">Administrador</option>
                <option value="2">Empresarial</option>
                <option value="3">Postulante</option>
              </select>
            </div>

            <div class="flex justify-end space-x-4 mt-4">
              <button
                type="button"
                @click="mostrarModal = false"
                class="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Agregar Usuario
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Modal para Editar Usuario -->
      <div
  v-if="mostrarModalEditar"
  class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
>
  <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
    <h2 class="text-2xl font-bold mb-4">Editar Usuario</h2>

    <form @submit.prevent="guardarEdicionUsuario">
      <div class="mb-4">
        <label class="block text-gray-700">Nombre</label>
        <input
          v-model="usuarioEditado.nombre"
          type="text"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Correo</label>
        <input
          v-model="usuarioEditado.correo"
          type="email"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Empresa</label>
        <input
          v-model="usuarioEditado.nombreEmpresa"
          type="text"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none"
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Tipo de Empresa</label>
        <input
          v-model="usuarioEditado.tipoEmpresa"
          type="text"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none"
        />
      </div>

      <!-- Selección de Rol -->
      <div class="mb-4">
        <label class="block text-gray-700">Rol</label>
        <select
          v-model="usuarioEditado.idRol"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none"
          required
        >
          <option value="1">Administrador</option>
          <option value="2">Empresarial</option>
          <option value="3">Postulante</option>
        </select>
      </div>

      <div class="flex justify-end space-x-4 mt-4">
        <button
          type="button"
          @click="mostrarModalEditar = false"
          class="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Guardar Cambios
        </button>
      </div>
    </form>
  </div>
</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import SidebarComponent from "@/components/SidebarComponent.vue";
import { getUsuarios, createUsuario, deleteUsuario, updateUsuario } from "@/services/api";

// Estado de usuarios y modal
const usuarios = ref([]);
const loading = ref(true);
const error = ref<string | null>(null);
const mostrarModal = ref(false);
const mostrarModalEditar = ref(false);

// Datos para el nuevo usuario
const nuevoUsuario = ref({
  nombre: "",
  correo: "",
  contraseña: "",
  confirmarContraseña: "",
  idRol: 1,
  nombreRol: "Administrador",
  nombreEmpresa: "",
  tipoEmpresa: "",
  direccion: "",
  telefono: "",
  sitioWeb: "",
  descripcionEmpresa: "",
});

// Datos del usuario para edición
const usuarioEditado = ref({
  id: null,
  nombre: "",
  correo: "",
  nombreEmpresa: "",
  tipoEmpresa: "",
  idRol: null,
});

// Obtener usuarios al cargar
const fetchUsuarios = async () => {
  try {
    usuarios.value = await getUsuarios();
  } catch (err) {
    error.value = "Error al cargar usuarios.";
  } finally {
    loading.value = false;
  }
};

// Abrir modal para agregar usuario
const openAddUserModal = () => {
  mostrarModal.value = true;
};

// Abrir modal para editar usuario
const editarUsuario = (usuario: any) => {
  usuarioEditado.value = { ...usuario }; // Copia los datos del usuario seleccionado
  mostrarModalEditar.value = true; // Muestra el modal
};

// Crear nuevo usuario
const agregarUsuario = async () => {
  if (nuevoUsuario.value.contraseña !== nuevoUsuario.value.confirmarContraseña) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  try {
    await createUsuario(nuevoUsuario.value);
    mostrarModal.value = false;
    fetchUsuarios();
    alert("Usuario agregado exitosamente.");
  } catch (err) {
    console.error("Error al agregar el usuario:", err);
    alert("Hubo un error al crear el usuario.");
  }
};

// Guardar cambios del usuario editado
const guardarEdicionUsuario = async () => {
  if (!usuarioEditado.value.id) {
    alert("No se ha seleccionado un usuario para editar.");
    return;
  }

  try {
    // Llama al servicio updateUsuario y pasa los datos actualizados
    await updateUsuario(usuarioEditado.value.id, usuarioEditado.value);
    alert("Usuario actualizado exitosamente.");

    // Actualiza la lista de usuarios
    await fetchUsuarios();

    // Cierra el modal
    mostrarModalEditar.value = false;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al actualizar el usuario:", error.message);
      alert(`Hubo un error al actualizar el usuario: ${error.message}`);
    } else {
      console.error("Error desconocido al actualizar el usuario.");
      alert("Ocurrió un error inesperado.");
    }
  }
};

// Eliminar usuario
const eliminarUsuario = async (usuarioId: number) => {
  console.log("ID del usuario a eliminar:", usuarioId);

  if (typeof usuarioId !== "number" || usuarioId <= 0) {
    alert("Error: el ID del usuario es inválido.");
    return;
  }

  const confirmacion = confirm("¿Estás seguro de que deseas eliminar este usuario?");
  if (!confirmacion) return;

  try {
    const respuesta = await deleteUsuario(usuarioId);
    console.log("Respuesta del servidor:", respuesta);
    await fetchUsuarios();
    alert("Usuario eliminado exitosamente.");
  } catch (err) {
    console.error("Error al eliminar el usuario:", err);
    alert("Hubo un error al eliminar el usuario.");
  }
};

// Actualizar el nombreRol según el idRol seleccionado
watch(() => nuevoUsuario.value.idRol, (newValue) => {
  switch (newValue) {
    case 1:
      nuevoUsuario.value.nombreRol = "Administrador";
      break;
    case 2:
      nuevoUsuario.value.nombreRol = "Reclutador";
      break;
    case 3:
      nuevoUsuario.value.nombreRol = "Postulante";
      break;
    default:
      nuevoUsuario.value.nombreRol = "Desconocido";
  }
});

onMounted(() => {
  fetchUsuarios();
});
</script>

<style scoped>
/* Estilos adicionales si necesitas */
</style>
