<template>
  <header class="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
    <nav class="container mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Logo y Nombre -->
      <div class="flex items-center space-x-2">
        <router-link to="/" class="flex items-center">
          <img class="w-10 h-10 transition-transform duration-300 hover:scale-110" src="@/assets/trans.png" alt="Logo" />
          <span class="ml-2 text-xl font-bold hidden sm:block">EmpleoLink</span>
        </router-link>
      </div>

      <!-- Menú móvil toggle -->
      <button @click="isMenuOpen = !isMenuOpen"
        class="md:hidden focus:outline-none p-2 rounded-full hover:bg-blue-700 transition-colors"
        aria-label="Toggle menu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Menú de navegación -->
      <div :class="[
        'md:flex md:items-center md:space-x-10',
        'absolute md:static top-16 left-0 w-full md:w-auto',
        'md:bg-transparent px-6 md:px-2',
        'transition-all duration-300 ease-out overflow-hidden',
        'shadow-md md:shadow-none rounded-lg',
        isMenuOpen
          ? 'max-h-screen py-8 opacity-100'
          : 'max-h-0 opacity-0 md:max-h-full md:opacity-100',
      ]">
        <!-- Enlaces comunes -->
        <router-link to="/" class="nav-link"> Home </router-link>

        <!-- Mostrar solo para usuarios empresariales -->
        <router-link v-if="userRole === 'Empresarial'" to="/empresarial/vacantes" class="nav-link">
          Mis Vacantes
        </router-link>

        <!-- Mostrar solo para usuarios administradores -->
        <router-link v-if="userRole === 'Administrador'" to="/admin/roles" class="nav-link">
          Admin Panel
        </router-link>

        <router-link v-if="userRole === 'Empresarial'" to="/PerfilEmpresa" class="nav-link">
          Perfil Empresa
        </router-link>

        <router-link to="/Nosotros" class="nav-link"> Nosotros</router-link>

        <!-- Enlaces de autenticación -->
        <template v-if="!isLoggedIn">
          <div class="flex items-center space-x-4">
            <router-link to="/login"
              class="nav-link text-blue-100 border border-blue-400 px-4 py-2 rounded-md hover:text-white hover:bg-blue-400 transition">
              Iniciar Sesión
            </router-link>
            <router-link to="/register"
              class="btn-primary bg-blue-500 text-white px-5 py-2 rounded-md shadow-lg hover:bg-blue-600 transition">
              Regístrate
            </router-link>
          </div>
        </template>

        <template v-else>
          <button @click="logout"
            class="bg-red-500 text-white px-5 py-2 rounded-md shadow-lg hover:bg-red-600 transition">
            Cerrar Sesión
          </button>
        </template>
      </div>
    </nav>
  </header>
</template>

<script>
import { AuthService } from '@/services/authService';

export default {
  name: 'AppHeader',
  data() {
    return {
      isMenuOpen: false,
      isLoggedIn: false,
      userRole: '',
    };
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
      this.userRole = userData.rol || '';
    },
    async logout() {
      try {
        await AuthService.logout(); // Llamar al método que invalida el token
        this.isLoggedIn = false;
        this.userRole = '';
        window.dispatchEvent(new Event('auth-change'));

        if (this.$route.path !== '/login') {
          this.$router.push('/login');
        }
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    },
  },
};
</script>