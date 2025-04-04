<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <!-- Notificación de éxito -->
    <div v-if="showSuccess" class="fixed top-4 right-4 z-50">
      <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-lg flex items-center">
        <svg class="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <div>
          <p class="font-bold">Éxito</p>
          <p>Los cambios se guardaron correctamente.</p>
        </div>
        <button @click="showSuccess = false" class="ml-4 text-green-700 hover:text-green-900">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <HeaderComponent />

    <div class="flex-1 p-6">
      <h1 class="text-3xl font-bold text-blue-600 mb-6">Perfil de Usuario</h1>
      <div class="bg-white shadow-lg rounded-xl p-6">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Información Personal</h2>

        <div class="flex items-center space-x-4 mb-6">
          <img
            :src="usuario.foto || 'https://via.placeholder.com/150'"
            class="w-24 h-24 rounded-full shadow-md"
            alt="Foto de perfil"
          />
          <div>
            <label class="block text-gray-700 font-medium">Subir Foto:</label>
            <input type="file" @change="cargarFoto" class="mt-2" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-gray-700 font-medium">Nombre:</label>
            <input
              v-model="usuario.nombre"
              type="text"
              class="w-full p-2 border rounded-lg"
              disabled
            />
          </div>
          <div>
            <label class="block text-gray-700 font-medium">Correo Electrónico:</label>
            <input
              v-model="usuario.email"
              type="email"
              class="w-full p-2 border rounded-lg"
              disabled
            />
          </div>
          <div>
            <label class="block text-gray-700 font-medium">Teléfono:</label>
            <input
              v-model="usuario.telefono"
              type="text"
              class="w-full p-2 border rounded-lg"
              @input="guardarEnLocalStorage"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-medium">Ubicación:</label>
            <input
              v-model="usuario.ubicacion"
              type="text"
              class="w-full p-2 border rounded-lg"
              @input="guardarEnLocalStorage"
            />
          </div>
        </div>
      </div>

      <div class="bg-white shadow-lg rounded-xl p-6 mt-6">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Información Laboral</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-gray-700 font-medium">Puesto Actual:</label>
            <input
              v-model="usuario.puesto"
              type="text"
              class="w-full p-2 border rounded-lg"
              @input="guardarEnLocalStorage"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-medium">Empresa:</label>
            <input
              v-model="usuario.empresa"
              type="text"
              class="w-full p-2 border rounded-lg"
              @input="guardarEnLocalStorage"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-medium">Experiencia (años):</label>
            <input
              v-model="usuario.experiencia"
              type="number"
              class="w-full p-2 border rounded-lg"
              @input="guardarEnLocalStorage"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-medium">Habilidades:</label>
            <textarea
              v-model="usuario.habilidades"
              rows="3"
              class="w-full p-2 border rounded-lg"
              @input="guardarEnLocalStorage"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="bg-white shadow-lg rounded-xl p-6 mt-6">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Educación</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-gray-700 font-medium">Título Profesional:</label>
            <input
              v-model="usuario.titulo"
              type="text"
              class="w-full p-2 border rounded-lg"
              @input="guardarEnLocalStorage"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-medium">Universidad:</label>
            <input
              v-model="usuario.universidad"
              type="text"
              class="w-full p-2 border rounded-lg"
              @input="guardarEnLocalStorage"
            />
          </div>
        </div>
      </div>

      <button
        @click="guardarPerfil"
        class="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Guardar Cambios
      </button>
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { perfilUSer } from '@/services/api'

export default {
  components: { HeaderComponent, FooterComponent },
  data() {
    return {
      usuario: {
        foto: '',
        nombre: '',
        email: '',
        telefono: '',
        ubicacion: '',
        puesto: '',
        empresa: '',
        experiencia: '',
        habilidades: '',
        titulo: '',
        universidad: '',
        linkedin: '',
        github: '',
      },
      showSuccess: false
    }
  },
  async mounted() {
    this.cargarDesdeLocalStorage()
    await this.cargarDatos()
  },
  methods: {
    async cargarDatos() {
      try {
        const dataInfo = await perfilUSer()
        if (dataInfo.nombre && dataInfo.correo) {
          this.usuario.nombre = dataInfo.nombre
          this.usuario.email = dataInfo.correo
          this.guardarEnLocalStorage() // Guardar en localStorage tras cargar desde la API
        }
      } catch (error) {
        console.error('Error al cargar datos:', error)
      }
    },
    cargarFoto(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.usuario.foto = e.target.result
          this.guardarEnLocalStorage()
        }
        reader.readAsDataURL(file)
      }
    },
    guardarEnLocalStorage() {
      const datosLocal = { ...this.usuario }
      delete datosLocal.nombre
      delete datosLocal.email
      localStorage.setItem('usuarioDatos', JSON.stringify(datosLocal))
    },
    cargarDesdeLocalStorage() {
      const datosGuardados = localStorage.getItem('usuarioDatos')
      if (datosGuardados) {
        const datosParseados = JSON.parse(datosGuardados)
        Object.keys(datosParseados).forEach((key) => {
          if (this.usuario.hasOwnProperty(key)) {
            this.usuario[key] = datosParseados[key]
          }
        })
      }
    },
    guardarPerfil() {
      console.log('Perfil guardado:', this.usuario)
      this.guardarEnLocalStorage()
      this.showSuccess = true
      setTimeout(() => {
        this.showSuccess = false
        window.location.reload() // Recarga la página después de mostrar la notificación
      }, 500)
    },
  },
}
</script>

<style scoped>
input,
textarea {
  border: 1px solid #ccc;
  padding: 8px;
  background-color: #f9f9f9;
}
</style>