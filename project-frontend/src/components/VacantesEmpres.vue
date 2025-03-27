<template>
  <div class="px-4 py-8 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Mis Vacantes</h1>
      <button
        @click="crearVacante"
        class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
      >
        + Nueva Vacante
      </button>
    </div>

    <div v-if="errorMessage" class="text-center text-red-600 font-medium py-4">
      {{ errorMessage }}
    </div>

    <div v-if="vacantesEmpresa.length === 0 && !errorMessage" class="text-center text-gray-500 text-lg py-12">
      Aún no has creado ninguna vacante.
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="vacante in vacantesEmpresa"
        :key="vacante.id"
        class="bg-white shadow-lg rounded-xl border border-gray-100 p-6"
      >
        <h3 class="text-lg font-bold text-gray-900">{{ vacante.nombre }}</h3>
        <p class="text-gray-600">{{ vacante.descripcion }}</p>
        <div class="flex justify-between mt-4">
          <button
            @click="editarVacante(vacante.id)"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Editar
          </button>
          <button
            @click="borrarVacante(vacante.id)"
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Borrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getVacantesEmpresa, deleteVacante } from '@/services/api.js'

const vacantesEmpresa = ref([])
const errorMessage = ref('')

const cargarVacantes = async () => {
  const usuarioId = localStorage.getItem('usuarioId')  // Obtén el usuarioId desde localStorage
  console.log("usuarioId:", usuarioId);  // Verifica el valor de usuarioId

  if (!usuarioId) {
    console.error("El usuarioId está undefined o null.");
    errorMessage.value = "No se pudo encontrar el usuarioId. Inicia sesión nuevamente.";
    return;  // Detener la función si el usuarioId no está definido
  }

  try {
    const vacantes = await getVacantesEmpresa();  // Llamada a la API sin pasar el usuarioId ya que lo obtenemos de localStorage
    vacantesEmpresa.value = vacantes
    console.log("Vacantes recibidas:", vacantes);
  } catch (error) {
    console.error("Error al cargar vacantes:", error);
    errorMessage.value = 'Hubo un problema al cargar las vacantes. Intenta nuevamente.'
  }
};

const crearVacante = () => {
  // Lógica para redirigir a la creación de vacante
  console.log('Redirigiendo a crear vacante')
}

const editarVacante = (id) => {
  // Lógica para redirigir a la edición de la vacante
  console.log('Editando vacante', id)
}

const borrarVacante = async (id) => {
  if (confirm('¿Estás seguro de que quieres borrar esta vacante?')) {
    try {
      await deleteVacante(id)
      await cargarVacantes()
    } catch (error) {
      errorMessage.value = 'No se pudo borrar la vacante. Intenta nuevamente.'
      console.error(error)
    }
  }
}

onMounted(() => {
  cargarVacantes()
})
</script>
