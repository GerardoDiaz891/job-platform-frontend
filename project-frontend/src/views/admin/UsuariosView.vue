<template>
  <div class="flex min-h-screen">
    <SidebarComponent />

    <div class="flex-1 p-6 bg-gray-100">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Gestión de Usuarios</h1>
        <button
          @click="openAddUserModal"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <span>+</span>
          <span>Agregar Usuario</span>
        </button>
      </div>

      <!-- Filtros y búsqueda -->
      <div class="bg-white p-4 rounded-lg shadow mb-6">
        <div class="flex flex-col md:flex-row gap-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar usuarios..."
            class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            v-model="roleFilter"
            class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los roles</option>
            <option v-for="role in roles" :key="role.id" :value="role.id">
              {{ role.nombre }}
            </option>
          </select>
        </div>
      </div>

      <!-- Tabla de Usuarios -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div v-if="loading" class="p-8 text-center text-gray-500">
          Cargando usuarios...
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
                    Correo
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rol
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Empresa
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="usuario in filteredUsers" :key="usuario.idUsuario" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ usuario.idUsuario }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ usuario.nombre }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ usuario.correo }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                      :class="getRoleBadgeClass(usuario.nombreRol)">
                      {{ usuario.nombreRol }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ usuario.nombreEmpresa || 'N/A' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <button
                        @click="editUser(usuario)"
                        class="text-blue-600 hover:text-blue-900"
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button
                        @click="confirmDelete(usuario)"
                        class="text-red-600 hover:text-red-900"
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Paginación -->
          <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Mostrando
                  <span class="font-medium">{{ pagination.from }}</span>
                  a
                  <span class="font-medium">{{ pagination.to }}</span>
                  de
                  <span class="font-medium">{{ pagination.total }}</span>
                  resultados
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    @click="prevPage"
                    :disabled="pagination.currentPage === 1"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span class="sr-only">Anterior</span>
                    ←
                  </button>
                  <button
                    v-for="page in pages"
                    :key="page"
                    @click="goToPage(page)"
                    :class="{'bg-blue-50 border-blue-500 text-blue-600': pagination.currentPage === page, 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50': pagination.currentPage !== page}"
                    class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    {{ page }}
                  </button>
                  <button
                    @click="nextPage"
                    :disabled="pagination.currentPage === pagination.lastPage"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span class="sr-only">Siguiente</span>
                    →
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- Modal para Agregar/Editar Usuario -->
      <UserModal
        :show="showModal"
        :user="currentUser"
        :roles="roles"
        @close="closeModal"
        @save="saveUser"
      />
      
      <!-- Modal de Confirmación -->
      <ConfirmationModal
        :show="showConfirmationModal"
        title="Eliminar Usuario"
        message="¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer."
        @confirm="deleteUser"
        @cancel="showConfirmationModal = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import SidebarComponent from '@/components/SidebarComponent.vue';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from '@/services/api';
import { getRoles } from '@/services/api';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import UserModal from '@/components/admin/UserModal.vue';



// Estado
const usuarios = ref([]);
const roles = ref([]);
const loading = ref(true);
const error = ref(null);
const showModal = ref(false);
const showConfirmationModal = ref(false);
const currentUser = ref(null);
const userToDelete = ref(null);

// Filtros
const searchQuery = ref('');
const roleFilter = ref('');

// Paginación
const pagination = ref({
  currentPage: 1,
  perPage: 10,
  total: 0,
  from: 0,
  to: 0,
  lastPage: 0
});

// Obtener usuarios
const fetchUsuarios = async () => {
  try {
    loading.value = true;
    const data = await getUsuarios();
    usuarios.value = data;
    pagination.value.total = data.length;
    pagination.value.lastPage = Math.ceil(data.length / pagination.value.perPage);
    updatePaginationRange();
  } catch (err) {
    error.value = 'Error al cargar usuarios.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Obtener roles
const fetchRoles = async () => {
  try {
    roles.value = await getRoles();
  } catch (err) {
    console.error('Error al cargar roles:', err);
  }
};

// Filtros computados
const filteredUsers = computed(() => {
  let result = usuarios.value;
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(user => 
      user.nombre.toLowerCase().includes(query) || 
      user.correo.toLowerCase().includes(query) ||
      (user.nombreEmpresa && user.nombreEmpresa.toLowerCase().includes(query))
    );
  }
  
  if (roleFilter.value) {
    result = result.filter(user => user.idRol == roleFilter.value);
  }
  
  // Actualizar paginación
  pagination.value.total = result.length;
  pagination.value.lastPage = Math.ceil(result.length / pagination.value.perPage);
  
  // Aplicar paginación
  const start = (pagination.value.currentPage - 1) * pagination.value.perPage;
  const end = start + pagination.value.perPage;
  
  return result.slice(start, end);
});

// Paginación
const pages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, pagination.value.currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(pagination.value.lastPage, start + maxVisible - 1);
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  return pages;
});

const updatePaginationRange = () => {
  pagination.value.from = (pagination.value.currentPage - 1) * pagination.value.perPage + 1;
  pagination.value.to = Math.min(
    pagination.value.currentPage * pagination.value.perPage,
    pagination.value.total
  );
};

const goToPage = (page) => {
  if (page >= 1 && page <= pagination.value.lastPage) {
    pagination.value.currentPage = page;
    updatePaginationRange();
  }
};

const nextPage = () => {
  if (pagination.value.currentPage < pagination.value.lastPage) {
    pagination.value.currentPage++;
    updatePaginationRange();
  }
};

const prevPage = () => {
  if (pagination.value.currentPage > 1) {
    pagination.value.currentPage--;
    updatePaginationRange();
  }
};

// Estilos para los badges de roles
const getRoleBadgeClass = (roleName) => {
  switch (roleName) {
    case 'Administrador':
      return 'bg-purple-100 text-purple-800';
    case 'Reclutador':
      return 'bg-blue-100 text-blue-800';
    case 'Postulante':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Modal de usuario
const openAddUserModal = () => {
  currentUser.value = {
    nombre: '',
    correo: '',
    contraseña: '',
    confirmarContraseña: '',
    idRol: roles.value.length > 0 ? roles.value[0].id : null,
    nombreEmpresa: '',
    tipoEmpresa: '',
    direccion: '',
    telefono: '',
    sitioWeb: '',
    descripcionEmpresa: ''
  };
  showModal.value = true;
};

const editUser = (user) => {
  currentUser.value = { ...user, confirmarContraseña: '' };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  currentUser.value = null;
};

// Guardar usuario
const saveUser = async (userData) => {
  try {
    if (userData.id) {
      // Para edición
      await updateUsuario(userData.id, userData);
    } else {
      // Para creación
      await createUsuario(userData);
    }
    await fetchUsuarios();
    showModal.value = false;
  } catch (err) {
    console.error('Error al guardar el usuario:', err);
    error.value = err.message || 'Error al guardar el usuario';
  }
};

const confirmDelete = (user) => {
  if (!user?.id) {
    error.value = 'Usuario no válido';
    return;
  }
  userToDelete.value = user.id;
  showConfirmationModal.value = true;
};

const deleteUser = async () => {
  try {
    await deleteUsuario(userToDelete.value);
    await fetchUsuarios();
    showConfirmationModal.value = false;
  } catch (err) {
    console.error('Error al eliminar el usuario:', err);
    error.value = 'Error al eliminar el usuario';
  }
};

// Inicialización
onMounted(() => {
  fetchUsuarios();
  fetchRoles();
});
</script>