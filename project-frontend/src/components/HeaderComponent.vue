<template>
    <header class="bg-blue-600 text-white shadow-md">
      <div class="container mx-auto flex justify-between items-center p-4">
        <router-link to="/" class="text-2xl font-bold">
          GetWork
        </router-link>
        <nav class="flex space-x-4">
          <router-link to="/" class="hover:underline">Inicio</router-link>
          <router-link to="/vacantes" class="hover:underline">Vacantes</router-link>
          <router-link to="/login" class="hover:underline">Iniciar Sesión</router-link>
        </nav>
      </div>
    </header>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  </style>
  