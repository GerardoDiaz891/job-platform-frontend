<template>
    <div class="h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 class="text-9xl font-extrabold text-blue-600 float-effect">404</h1>
      <p class="text-xl mt-4">Oops! Página no encontrada😱</p>
      <p class="text-gray-500">Parece que te perdiste en el ciberespacio.🚀</p>
      <router-link 
        to="/" 
        class="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition font-semibold shadow-lg"
      >
        Volver al inicio
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
  };
  </script>
  
  <style scoped>
  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
    100% {
      transform: translateY(0);
    }
  }
  
  .float-effect {
    animation: float 2s ease-in-out infinite;
  }
  </style>
  