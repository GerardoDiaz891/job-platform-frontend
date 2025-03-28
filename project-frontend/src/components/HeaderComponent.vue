<template>
  <header class="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
    <nav class="container mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Logo y Nombre -->
      <div class="flex items-center space-x-2">
        <router-link to="/" class="flex items-center">
          <img 
            class="w-10 h-10 transition-transform duration-300 hover:scale-110" 
            src="@/assets/trans.png" 
            alt="Logo"
          />
          <span class="ml-2 text-xl font-bold hidden sm:block">EmpleoLink</span>
        </router-link>
      </div>

      <!-- Menú móvil toggle -->
      <button 
        @click="isMenuOpen = !isMenuOpen"
        class="md:hidden focus:outline-none p-2 rounded-full hover:bg-blue-700 transition-colors"
        aria-label="Toggle menu"
      >
        <svg 
          class="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
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
          'md:flex md:items-center md:space-x-2',
          'absolute md:static top-16 left-0 w-full md:w-auto',
          'bg-gradient-to-b from-blue-600 to-blue-700 md:bg-transparent px-4 md:px-0',
          'transition-all duration-300 ease-in-out overflow-hidden',
          'shadow-lg md:shadow-none',
          isMenuOpen ? 'max-h-screen py-4 opacity-100' : 'max-h-0 opacity-0 md:max-h-full md:opacity-100'
        ]"
      >
        <!-- Enlaces comunes -->
        <router-link 
          to="/" 
          class="nav-link"
        >
          Vacantes
        </router-link>
        
        <!-- Mostrar solo para usuarios empresariales -->
        <router-link 
          v-if="userRole === 'Empresarial'"
          to="/empresarial/vacantes" 
          class="nav-link"
        >
          Mis Vacantes
        </router-link>
        
        <router-link 
          to="/PerfilEmpresa" 
          class="nav-link"
        >
          Perfil Empresa
        </router-link>
        
        <router-link 
          to="/Nosotros" 
          class="nav-link"
        >
          Nosotros
        </router-link>

        <!-- Enlaces de autenticación -->
        <template v-if="!isLoggedIn">
          <router-link 
            to="/login" 
            class="nav-link"
          >
            Iniciar Sesión
          </router-link>
          
          <router-link 
            to="/register" 
            class="btn-primary"
          >
            Regístrate
          </router-link>
        </template>
        
        <template v-else>
          <router-link 
            to="/mi-perfil" 
            class="nav-link"
          >
            Mi Perfil
          </router-link>
          
          <button 
            @click="logout"
            class="btn-danger"
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
      userRole: ''
    }
  },
  created() {
    this.checkAuthStatus();
    window.addEventListener('auth-change', this.checkAuthStatus);
  },
  beforeDestroy() {
    window.removeEventListener('auth-change', this.checkAuthStatus);
  },
  methods: {
    checkAuthStatus() {
      this.isLoggedIn = !!localStorage.getItem('token');
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      this.userRole = userData.role || '';
    },
    async logout() {
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        this.isLoggedIn = false;
        this.userRole = '';
        window.dispatchEvent(new Event('auth-change'));
        
        if (this.$route.path !== '/login') {
          this.$router.push('/login');
        }
        
        this.$notify({
          title: 'Sesión cerrada',
          text: 'Has cerrado sesión correctamente',
          type: 'success'
        });
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        this.$notify({
          title: 'Error',
          text: 'Ocurrió un problema al cerrar sesión',
          type: 'error'
        });
      }
    }
  }
}
</script>
