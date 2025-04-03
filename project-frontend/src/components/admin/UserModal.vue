<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-2xl font-bold text-gray-800">
                        {{ user.idUsuario ? 'Editar Usuario' : 'Agregar Usuario' }}
                    </h2>
                    <button @click="close" class="text-gray-500 hover:text-gray-700">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form @submit.prevent="submitForm">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <!-- Nombre -->
                        <div>
                            <label class="block text-gray-700 mb-2">Nombre *</label>
                            <input v-model="formData.nombre" type="text" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <!-- Correo -->
                        <div>
                            <label class="block text-gray-700 mb-2">Correo *</label>
                            <input v-model="formData.correo" type="email" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <!-- Contraseña -->
                        <div>
                            <label class="block text-gray-700 mb-2">
                                {{ user.idUsuario ? 'Nueva Contraseña' : 'Contraseña *' }}
                            </label>
                            <input v-model="formData.contraseña" type="password" :required="!user.idUsuario"
                                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                @input="validatePasswords" />
                        </div>

                        <!-- Confirmar Contraseña -->
                        <div>
                            <label class="block text-gray-700 mb-2">
                                {{ user.idUsuario ? 'Confirmar Nueva Contraseña' : 'Confirmar Contraseña *' }}
                            </label>
                            <input v-model="formData.confirmarContraseña" type="password" :required="!user.idUsuario"
                                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                @input="validatePasswords" />
                            <p v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</p>
                        </div>


                        <!-- Rol -->
                        <div>
                            <label class="block text-gray-700 mb-2">Rol *</label>
                            <select v-model="formData.idRol" required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option v-for="role in roles" :key="role.id" :value="role.id">
                                    {{ role.nombre }}
                                </option>
                            </select>
                        </div>

                        <!-- Empresa (solo para reclutadores) -->
                        <div>
                            <label class="block text-gray-700 mb-2">Empresa</label>
                            <input v-model="formData.nombreEmpresa" type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    <!-- Información adicional de la empresa -->
                    <div v-if="formData.idRol === 2" class="mb-4">
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">Información de la Empresa</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-gray-700 mb-2">Tipo de Empresa</label>
                                <input v-model="formData.tipoEmpresa" type="text"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label class="block text-gray-700 mb-2">Dirección</label>
                                <input v-model="formData.direccion" type="text"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label class="block text-gray-700 mb-2">Teléfono</label>
                                <input v-model="formData.telefono" type="text"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label class="block text-gray-700 mb-2">Sitio Web</label>
                                <input v-model="formData.sitioWeb" type="url"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>
                        <div class="mt-4">
                            <label class="block text-gray-700 mb-2">Descripción de la Empresa</label>
                            <textarea v-model="formData.descripcionEmpresa" rows="3"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                    </div>

                    <div class="flex justify-end space-x-4 mt-6">
                        <button type="button" @click="close"
                            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Cancelar
                        </button>
                        <button type="submit"
                            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            {{ user.idUsuario ? 'Actualizar Usuario' : 'Crear Usuario' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';

const props = defineProps({
  show: Boolean,
  user: Object,
  roles: Array
});

const emit = defineEmits(['close', 'save']);

const formData = ref({
  ...props.user,
  confirmarContraseña: ''
});

const passwordError = ref('');

watch(() => props.user, (newUser) => {
  formData.value = {
    ...newUser,
    confirmarContraseña: ''
  };
  passwordError.value = '';
}, { deep: true });

const validatePasswords = () => {
  if (formData.value.contraseña !== formData.value.confirmarContraseña) {
    passwordError.value = 'Las contraseñas no coinciden';
    return false;
  }
  passwordError.value = '';
  return true;
};

const close = () => {
  emit('close');
};

const submitForm = () => {
  // Validar contraseñas solo para nuevo usuario o cuando se cambia la contraseña
  if ((!props.user.idUsuario || formData.value.contraseña) && 
      formData.value.contraseña !== formData.value.confirmarContraseña) {
    passwordError.value = 'Las contraseñas no coinciden';
    return;
  }
  
  // Preparar datos para enviar
  const userData = {
    nombre: formData.value.nombre,
    correo: formData.value.correo,
    idRol: formData.value.idRol,
    nombreEmpresa: formData.value.nombreEmpresa,
    tipoEmpresa: formData.value.tipoEmpresa,
    direccion: formData.value.direccion,
    telefono: formData.value.telefono,
    sitioWeb: formData.value.sitioWeb,
    descripcionEmpresa: formData.value.descripcionEmpresa,
    idCV: formData.value.idCV || 0
  };
  
  // Solo incluir contraseña si se está creando o cambiando
  if (!props.user.idUsuario || formData.value.contraseña) {
    userData.contraseña = formData.value.contraseña;
  }
  
  // Si es edición, incluir el ID
  if (props.user.idUsuario) {
    userData.id = props.user.idUsuario;
  }
  
  emit('save', userData);
};
</script>