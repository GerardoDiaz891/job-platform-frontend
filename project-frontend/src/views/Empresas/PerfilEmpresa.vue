<template>
  <HeaderComponent />
  <div class="company-profile">
    <div class="profile-header">
      <h1>Datos de la empresa</h1>
      <button @click="toggleEditar" class="edit-button">
        {{ modoEdicion ? 'Cancelar' : 'Editar' }}
      </button>
    </div>

    <div class="profile-content">
      <label>Nombre de la empresa</label>
      <input v-model="empresa.nombreEmpresa" :disabled="!modoEdicion" type="text" />

      <label>Descripción de la Empresa</label>
      <textarea v-model="empresa.descripcionEmpresa" :disabled="!modoEdicion"></textarea>

      <label>Ubicación</label>
      <input v-model="empresa.direccion" :disabled="!modoEdicion" type="text" />

      <label>Correo Electrónico</label>
      <input v-model="empresa.correo" :disabled="!modoEdicion" type="email" />

      <label>Número de Teléfono</label>
      <input v-model="empresa.telefono" :disabled="!modoEdicion" type="tel" />

      <label>Sitio Web</label>
      <input v-model="empresa.sitioWeb" :disabled="!modoEdicion" type="url" />

      <!-- Botón de guardar cambios solo visible en modo edición -->
      <button v-if="modoEdicion" @click="guardarCambios" class="save-button">
        Guardar Cambios
      </button>
    </div>
  </div>
  <FooterComponent />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import FooterComponent from '@/components/FooterComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import { perfilUSer, updateUser } from '@/services/api'

const empresa = ref({
  id: null,
  nombreEmpresa: '',
  descripcionEmpresa: '',
  direccion: '',
  correo: '',
  telefono: '',
  sitioWeb: '',
})

const modoEdicion = ref(false)

async function cargarDatos() {
  try {
    const dataInfo = await perfilUSer()
    if (dataInfo) {
      empresa.value = {
        id: dataInfo.id,
        nombreEmpresa: dataInfo.nombreEmpresa || '',
        descripcionEmpresa: dataInfo.descripcionEmpresa || '',
        direccion: dataInfo.direccion || '',
        correo: dataInfo.correo || '',
        telefono: dataInfo.telefono || '',
        sitioWeb: dataInfo.sitioWeb || '',
      }
    }
  } catch (error) {
    console.error('Error al obtener datos de la empresa:', error)
  }
}

async function guardarCambios() {
  try {
    if (!empresa.value.id) {
      console.error('No hay ID de empresa para actualizar')
      return
    }

    const dataActualizada = { ...empresa.value }

    // Llamada a la API para actualizar los datos de la empresa
    await updateUser(empresa.value.id, dataActualizada)
    alert('Perfil actualizado correctamente')
    modoEdicion.value = false // Desactivar modo edición
  } catch (error) {
    console.error('Error al actualizar datos de la empresa:', error)
    alert('Error al actualizar el perfil')
  }
}

function toggleEditar() {
  modoEdicion.value = !modoEdicion.value
}

onMounted(cargarDatos)
</script>

<style scoped>
h1 {
  color: black;
}

.company-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 600px;
  margin: 3rem auto;
  background: #ececed;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-header {
  text-align: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.profile-content {
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-weight: bold;
  color: black;
}

input,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input:disabled,
textarea:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

button {
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button {
  background: #f0ad4e;
  color: white;
}

.save-button {
  background: #007bff;
  color: white;
}

.edit-button:hover {
  background: #ec971f;
}

.save-button:hover {
  background: #0056b3;
}
</style>
