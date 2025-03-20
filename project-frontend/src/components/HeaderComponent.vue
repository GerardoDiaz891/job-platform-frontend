<template>
  <header class="bg-blue-600 text-white">
    <nav class="container mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex-shrink-0">
        <a href="/">
          <img 
            class="w-12 h-12 transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-3" 
            src="@/assets/trans.png" 
            alt="Logo"
          />
        </a>
      </div>

      <button 
        @click="isMenuOpen = !isMenuOpen"
        class="md:hidden focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg 
          class="w-8 h-8" 
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

      <div 
        :class="[
          'md:flex md:items-center md:gap-6',
          'absolute md:static top-16 left-0 w-full md:w-auto',
          'bg-blue-600 md:bg-transparent',
          'transition-all duration-300 ease-in-out',
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100',
          'overflow-hidden md:overflow-visible'
        ]"
      >
        <a 
          href="/" 
          class="block px-4 py-2 md:p-1 relative transition-all duration-300 ease-in-out hover:text-blue-200 md:hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-blue-200 after:w-0 after:transition-all after:duration-300"
        >
          Vacantes
        </a>
        <a 
          href="/PerfilEmpresa" 
          class="block px-4 py-2 md:p-1 relative transition-all duration-300 ease-in-out hover:text-blue-200 md:hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-blue-200 after:w-0 after:transition-all after:duration-300"
        >
          Perfil Empresa
        </a>
        <a 
          href="/Nosotros" 
          class="block px-4 py-2 md:p-1 relative transition-all duration-300 ease-in-out hover:text-blue-200 md:hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-blue-200 after:w-0 after:transition-all after:duration-300"
        >
          Nosotros
        </a>
        <a 
          href="/login" 
          class="block px-4 py-2 md:p-1 relative transition-all duration-300 ease-in-out hover:text-blue-200 md:hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-blue-200 after:w-0 after:transition-all after:duration-300"
        >
          Iniciar Sesión
        </a>
        <a 
          href="/register" 
          class="block px-4 py-2 md:p-2 mx-4 md:mx-0 mb-2 md:mb-0 bg-white text-blue-600 rounded-md transition-all duration-300 ease-in-out hover:bg-blue-100 hover:shadow-lg hover:-translate-y-1"
        >
          Regístrate
        </a>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false
    }
  }
}
</script>