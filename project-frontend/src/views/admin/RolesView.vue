<template>
  <div class="flex min-h-screen">
    <SidebarComponent />

    <div class="flex-1 p-6 bg-gray-100">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Gestión de Roles</h1>
        <div class="flex space-x-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar roles..."
            class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            @click="openAddRoleModal"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <span>+</span>
            <span>Agregar Rol</span>
          </button>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div v-if="loading" class="p-8 text-center text-gray-500">
          Cargando roles...
        </div>
        
        <div v-else-if="error" class="p-8 text-center text-red-500 font-medium">
          {{ error }}
        </div>
        
        <template v-else>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr 
                  v-for="rol in filteredRoles" 
                  :key="rol.id" 
                  class="hover:bg-gray-50"
                >
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ rol.id }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div v-if="rolEditando === rol.id" class="flex items-center">
                      <input
                        v-model="nombreEditado"
                        type="text"
                        class="px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div v-else class="text-sm font-medium text-gray-900">
                      {{ rol.nombre }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <template v-if="rolEditando === rol.id">
                        <button
                          @click="guardarEdicion(rol.id)"
                          class="text-white bg-green-500 hover:bg-green-600 py-1 px-3 rounded-md text-xs"
                        >
                          Guardar
                        </button>
                        <button
                          @click="cancelarEdicion"
                          class="text-white bg-gray-500 hover:bg-gray-600 py-1 px-3 rounded-md text-xs"
                        >
                          Cancelar
                        </button>
                      </template>
                      <template v-else>
                        <button
                          @click="iniciarEdicion(rol)"
                          class="text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded-md text-xs"
                        >
                          Editar
                        </button>
                        <button
                          @click="confirmarEliminacion(rol.id)"
                          class="text-white bg-red-500 hover:bg-red-600 py-1 px-3 rounded-md text-xs"
                        >
                          Eliminar
                        </button>
                      </template>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </div>

      <!-- Modal de Confirmación -->
      <ConfirmationModal
        :show="showConfirmationModal"
        title="Eliminar Rol"
        message="¿Estás seguro de que deseas eliminar este rol? Esta acción no se puede deshacer."
        @confirm="eliminarRol"
        @cancel="showConfirmationModal = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import SidebarComponent from '@/components/SidebarComponent.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import { getRoles, createRol, deleteRol, updateRol } from '@/services/api';

// Estado
const roles = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref('');
const showConfirmationModal = ref(false);
const rolToDelete = ref(null);

// Edición
const rolEditando = ref(null);
const nombreEditado = ref('');

// Obtener roles
const fetchRoles = async () => {
  try {
    loading.value = true;
    roles.value = await getRoles();
  } catch (err) {
    error.value = 'Error al cargar los roles.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Filtros computados
const filteredRoles = computed(() => {
  if (!searchQuery.value) return roles.value;
  
  const query = searchQuery.value.toLowerCase();
  return roles.value.filter(rol => 
    rol.nombre.toLowerCase().includes(query) ||
    rol.id.toString().includes(query)
  );
});

// Agregar rol
const openAddRoleModal = () => {
  nombreEditado.value = 'Nuevo Rol'; // Valor por defecto
  rolEditando.value = 'new';
};

// Edición
const iniciarEdicion = (rol) => {
  rolEditando.value = rol.id;
  nombreEditado.value = rol.nombre;
};

const cancelarEdicion = () => {
  rolEditando.value = null;
  nombreEditado.value = '';
};

const guardarEdicion = async (id) => {
  const guardarEdicion = async (id) => {
  try {
    if (id === 'new') {
      await createRol({ nombre: nombreEditado.value });
    } else {
      await updateRol(id, { nombre: nombreEditado.value });
    }
    await fetchRoles();
    cancelarEdicion();
  } catch (err) {
    console.error('Error al guardar el rol:', err);
    error.value = 'Error al guardar el rol';
  }}
};

// Eliminación
const confirmarEliminacion = (id) => {
  rolToDelete.value = id;
  showConfirmationModal.value = true;
};

const eliminarRol = async () => {
  if (!rolToDelete.value) return;
  
  try {
    await deleteRol(rolToDelete.value);
    await fetchRoles();
    showConfirmationModal.value = false;
    rolToDelete.value = null;
  } catch (err: any) {
    console.error('Error al eliminar el rol:', err.message);
    error.value = err.message || 'Error al eliminar el rol. Por favor, inténtalo de nuevo.';
  }
};

// Inicialización
onMounted(() => {
  fetchRoles();
});
</script>