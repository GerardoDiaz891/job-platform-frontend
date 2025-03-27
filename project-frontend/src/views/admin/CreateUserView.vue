<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createUser } from '@/services/api';

const userForm = ref({
  nombre: '',
  correo: '',
  contraseña: '',
  confirmarContraseña: '',
  idRol: null,
  nombreRol: '',
  nombreEmpresa: '',
  tipoEmpresa: '',
  direccion: '',
  telefono: '',
  sitioWeb: '',
  descripcionEmpresa: ''
})

const roles = ref<{ id: number; nombre: string }[]>([]) // Lista de roles
const errorMessage = ref<string | null>(null)
const successMessage = ref<string | null>(null)

// Cargar los roles al montar el componente
onMounted(async () => {
  try {
    roles.value = await getRoles()
  } catch (error) {
    console.error('Error al cargar los roles:', error)
  }
})

// Manejar el cambio del rol seleccionado
const onRoleChange = (event: Event) => {
  const selectedRole = roles.value.find(role => role.id === Number((event.target as HTMLSelectElement).value))
  if (selectedRole) {
    userForm.value.idRol = selectedRole.id
    userForm.value.nombreRol = selectedRole.nombre
  }
}

const submitForm = async () => {
  try {
    const response = await createUser(userForm.value)
    successMessage.value = 'Usuario creado exitosamente'
    console.log('Respuesta del backend:', response)
  } catch (error) {
    errorMessage.value = 'Error al crear el usuario'
    console.error(error)
  }
}
</script>

<template>
  <div class="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
    <h2 class="text-xl font-semibold mb-4">Crear Usuario</h2>

    <form @submit.prevent="submitForm">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block">Nombre:</label>
          <input v-model="userForm.nombre" type="text" class="border rounded w-full p-2" required />
        </div>

        <div>
          <label class="block">Correo:</label>
          <input v-model="userForm.correo" type="email" class="border rounded w-full p-2" required />
        </div>

        <div>
          <label class="block">Contraseña:</label>
          <input v-model="userForm.contraseña" type="password" class="border rounded w-full p-2" required />
        </div>

        <div>
          <label class="block">Confirmar Contraseña:</label>
          <input v-model="userForm.confirmarContraseña" type="password" class="border rounded w-full p-2" required />
        </div>

        <div class="col-span-2">
          <label class="block">Rol:</label>
          <select v-model="userForm.idRol" @change="onRoleChange" class="border rounded w-full p-2">
            <option value="" disabled>Selecciona un rol</option>
            <option v-for="role in roles" :key="role.id" :value="role.id">
              {{ role.nombre }}
            </option>
          </select>
        </div>

        <div>
          <label class="block">Nombre Empresa:</label>
          <input v-model="userForm.nombreEmpresa" type="text" class="border rounded w-full p-2" required />
        </div>

        <div>
          <label class="block">Tipo Empresa:</label>
          <input v-model="userForm.tipoEmpresa" type="text" class="border rounded w-full p-2" required />
        </div>

        <div>
          <label class="block">Dirección:</label>
          <input v-model="userForm.direccion" type="text" class="border rounded w-full p-2" required />
        </div>

        <div>
          <label class="block">Teléfono:</label>
          <input v-model="userForm.telefono" type="tel" class="border rounded w-full p-2" required />
        </div>

        <div>
          <label class="block">Sitio Web:</label>
          <input v-model="userForm.sitioWeb" type="url" class="border rounded w-full p-2" required />
        </div>

        <div class="col-span-2">
          <label class="block">Descripción Empresa:</label>
          <textarea v-model="userForm.descripcionEmpresa" class="border rounded w-full p-2" rows="3" required></textarea>
        </div>
      </div>

      <button type="submit" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Crear Usuario
      </button>
    </form>

    <p v-if="successMessage" class="text-green-600 mt-2">{{ successMessage }}</p>
    <p v-if="errorMessage" class="text-red-600 mt-2">{{ errorMessage }}</p>
  </div>
</template>
