<template>
  <header class="bg-blue-600 text-white shadow-md">
    <nav class="container mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <router-link to="/">
          <img
            class="w-12 h-12 transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-3"
            src="@/assets/trans.png"
            alt="Logo"
          />
        </router-link>
      </div>

      <!-- Botón para menú móvil -->
      <button
        @click="isMenuOpen = !isMenuOpen"
        class="md:hidden focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            v-if="!isMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Menú de navegación -->
      <div
        :class="[
          'md:flex md:items-center md:gap-6',
          'absolute md:static top-16 left-0 w-full md:w-auto',
          'bg-blue-600 md:bg-transparent px-4 md:px-0',
          'transition-all duration-300 ease-in-out',
          isMenuOpen
            ? 'max-h-96 opacity-100 py-2'
            : 'max-h-0 opacity-0 md:max-h-none md:opacity-100',
          'overflow-hidden md:overflow-visible',
          'shadow-md md:shadow-none',
        ]"
      >
        <!-- Enlaces comunes -->
        <router-link
          to="/"
          class="block px-4 py-2 md:p-1 relative transition-all duration-300 ease-in-out hover:text-blue-200 md:hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-blue-200 after:w-0 after:transition-all after:duration-300"
        >
          Vacantes
        </router-link>

        <!-- Mostrar solo si el usuario está autenticado -->
        <template v-if="isLoggedIn">
          <router-link
            to="/Perfil/usuario"
            class="block px-4 py-2 md:p-1 relative transition-all duration-300 ease-in-out hover:text-blue-200 md:hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-blue-200 after:w-0 after:transition-all after:duration-300"
          >
            Perfil Usuario
          </router-link>

          <router-link
            to="/PerfilEmpresa"
            class="block px-4 py-2 md:p-1 relative transition-all duration-300 ease-in-out hover:text-blue-200 md:hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-blue-200 after:w-0 after:transition-all after:duration-300"
          >
            Perfil Empresa
          </router-link>
        </template>

        <router-link
          to="/Nosotros"
          class="block px-4 py-2 md:p-1 relative transition-all duration-300 ease-in-out hover:text-blue-200 md:hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-blue-200 after:w-0 after:transition-all after:duration-300"
        >
          Nosotros
        </router-link>

        <!-- Enlaces de autenticación -->
        <template v-if="!isLoggedIn">
          <!-- Mostrar cuando NO hay sesión -->
          <router-link
            to="/login"
            class="block px-4 py-2 md:p-1 relative transition-all duration-300 ease-in-out hover:text-blue-200 md:hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-blue-200 after:w-0 after:transition-all after:duration-300"
          >
            Iniciar Sesión
          </router-link>

          <router-link
            to="/register"
            class="block px-4 py-2 md:p-2 mx-4 md:mx-0 mb-2 md:mb-0 bg-white text-blue-600 rounded-md transition-all duration-300 ease-in-out hover:bg-blue-100 hover:shadow-lg hover:-translate-y-1"
          >
            Regístrate
          </router-link>
        </template>

        <template v-else>
          <!-- Mostrar cuando hay sesión -->
          <router-link
            to="/mi-perfil"
            class="block px-4 py-2 md:p-1 relative transition-all duration-300 ease-in-out hover:text-blue-200 md:hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-blue-200 after:w-0 after:transition-all after:duration-300"
          >
          </router-link>

          <button
            @click="logout"
            class="block px-4 py-2 md:p-2 mx-4 md:mx-0 mb-2 md:mb-0 bg-red-500 text-white rounded-md transition-all duration-300 ease-in-out hover:bg-red-600 hover:shadow-lg hover:-translate-y-1 focus:outline-none"
          >
            Cerrar Sesión
          </button>
        </template>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      isMenuOpen: false,
      isLoggedIn: false,
    }
  },
  created() {
    this.checkAuthStatus()
    window.addEventListener('auth-change', this.checkAuthStatus)

    // Verificar cuando cambia la ruta
    this.$router.afterEach(() => {
      this.checkAuthStatus()
    })
  },
  beforeDestroy() {
    window.removeEventListener('auth-change', this.checkAuthStatus)
  },
  methods: {
    checkAuthStatus() {
      this.isLoggedIn = !!localStorage.getItem('token')
    },
    async logout() {
      try {
        // Limpiar el almacenamiento local
        localStorage.removeItem('token')
        localStorage.removeItem('userData')

        this.isLoggedIn = false

        window.dispatchEvent(new Event('auth-change'))

        if (this.$route.path !== '/login') {
          this.$router.push('/login')
        }

        this.$notify({
          title: 'Sesión cerrada',
          text: 'Has cerrado sesión correctamente',
          type: 'success',
        })
      } catch (error) {
        console.error('Error al cerrar sesión:', error)
        this.$notify({
          title: 'Error',
          text: 'Ocurrió un problema al cerrar sesión',
          type: 'error',
        })
      }
    },
  },
}
</script>
