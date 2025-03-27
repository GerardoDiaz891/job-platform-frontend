<template>
  <div class="flex">
    <SidebarComponent />

    <div class="min-h-screen bg-white py-10 w-full">
      <h1 class="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        Lista de Roles
      </h1>

      <div class="text-center mb-8">
        <input 
          v-model="nuevoRol"
          type="text"
          placeholder="Nombre del rol"
          class="border px-4 py-2 rounded-md mr-2"
        />
        <button
          @click="agregarRol"
          class="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600"
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
                <th class="px-6 py-3 text-left font-semibold">Nombre</th>
                <th class="px-6 py-3 text-left font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="rol in roles" 
                :key="rol.id" 
                class="hover:bg-blue-50 transition-colors duration-200 even:bg-gray-50"
              >
                <td class="px-6 py-4 border-b border-gray-200">
                  <div v-if="rolEditando === rol.id">
                    <input 
                      v-model="nombreEditado" 
                      type="text" 
                      class="border px-2 py-1 rounded-md"
                    />
                  </div>
                  <div v-else>
                    {{ rol.nombre }}
                  </div>
                </td>
                <td class="px-6 py-4 border-b border-gray-200">
                  <div class="flex space-x-2 justify-center">
                    <button 
                      v-if="rolEditando === rol.id"
                      class="text-white bg-green-400 hover:bg-green-600 py-2 px-4 rounded-md"
                      @click="guardarEdicion(rol.id)"
                    >
                      💾 Guardar
                    </button>
                    <button 
                      v-if="rolEditando === rol.id"
                      class="text-white bg-gray-400 hover:bg-gray-600 py-2 px-4 rounded-md"
                      @click="cancelarEdicion"
                    >
                      ❌ Cancelar
                    </button>
                    <button 
                      v-else 
                      class="text-white bg-blue-400 hover:bg-blue-600 py-2 px-4 rounded-md"
                      @click="iniciarEdicion(rol)"
                    >
                      ✏️ Editar
                    </button>
                    <button 
                      class="text-white bg-red-400 hover:bg-red-600 py-2 px-4 rounded-md" 
                      @click="eliminarRol(rol.id)"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="!loading && roles.length === 0" class="text-center text-gray-500 py-6">
        No hay roles disponibles.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
import { getRoles, createRol, deleteRol, updateRol } from '@/services/api'

const roles = ref([])
const loading = ref(true)
const error = ref(null)
const nuevoRol = ref('')

const rolEditando = ref(null) // Almacena el ID del rol que se está editando
const nombreEditado = ref('') // Almacena el nuevo nombre del rol

const fetchRoles = async () => {
  try {
    loading.value = true
    roles.value = await getRoles()
  } catch (err) {
    error.value = 'Error al obtener los roles'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const agregarRol = async () => {
  if (!nuevoRol.value.trim()) {
    alert('El nombre del rol es obligatorio')
    return
  }
  try {
    await createRol({ nombre: nuevoRol.value })
    nuevoRol.value = ''
    await fetchRoles()
  } catch (err) {
    console.error('Error al agregar el rol:', err)
  }
}

const eliminarRol = async (id) => {
  if (!confirm('¿Estás seguro de que deseas eliminar este rol?')) return

  try {
    await deleteRol(id)
    roles.value = roles.value.filter(rol => rol.id !== id)
  } catch (err) {
    console.error('Error al eliminar el rol:', err)
  }
}

const iniciarEdicion = (rol) => {
  rolEditando.value = rol.id
  nombreEditado.value = rol.nombre
}

const cancelarEdicion = () => {
  rolEditando.value = null
  nombreEditado.value = ''
}

const guardarEdicion = async (id) => {
  if (!nombreEditado.value.trim()) {
    alert('El nombre del rol no puede estar vacío')
    return
  }
  
  try {
    await updateRol(id, { nombre: nombreEditado.value })
    roles.value = roles.value.map(rol => 
      rol.id === id ? { ...rol, nombre: nombreEditado.value } : rol
    )
    cancelarEdicion()
  } catch (err) {
    console.error('Error al actualizar el rol:', err)
  }
}

onMounted(fetchRoles)
</script>
