<script setup>
import SidebarComponent from "@/components/SidebarComponent.vue";
</script>

<template>
  <div class="flex bg-gray-100 min-h-screen">
    <SidebarComponent />
    <div class="flex-1 p-6">
      <h1 class="text-3xl font-bold text-blue-600 mb-6">Panel de Control</h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        <div class="p-6 bg-white shadow-lg rounded-xl flex items-center gap-4 border-l-4 border-blue-600 hover:shadow-xl transition">
          <div class="w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-full text-xl font-bold">
            U
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-700">Usuarios</h2>
            <p class="text-gray-500 text-lg font-medium">Total: <span class="text-blue-600 font-bold">120</span></p>
          </div>
        </div>

        <div class="p-6 bg-white shadow-lg rounded-xl flex items-center gap-4 border-l-4 border-green-600 hover:shadow-xl transition">
          <div class="w-12 h-12 bg-green-600 text-white flex items-center justify-center rounded-full text-xl font-bold">
            V
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-700">Vacantes</h2>
            <p class="text-gray-500 text-lg font-medium">Total: <span class="text-green-600 font-bold">45</span></p>
          </div>
        </div>

        <div class="p-6 bg-white shadow-lg rounded-xl flex items-center gap-4 border-l-4 border-yellow-500 hover:shadow-xl transition">
          <div class="w-12 h-12 bg-yellow-500 text-white flex items-center justify-center rounded-full text-xl font-bold">
            C
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-700">Categorías</h2>
            <p class="text-gray-500 text-lg font-medium">Total: <span class="text-yellow-500 font-bold">10</span></p>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div class="bg-white shadow-lg rounded-xl p-6 col-span-2">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Usuarios Registrados</h2>
          <div class="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
            📊 Gráfica de usuarios (Placeholder)
          </div>
        </div>


        <div class="bg-white shadow-lg rounded-xl p-6">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Últimas Vacantes</h2>
          <ul class="space-y-3">
            <li class="flex justify-between text-gray-600">
              <span>Desarrollador Full Stack</span>
              <span class="text-blue-600 font-bold">✔</span>
            </li>
            <li class="flex justify-between text-gray-600">
              <span>Diseñador UI/UX</span>
              <span class="text-green-600 font-bold">✔</span>
            </li>
            <li class="flex justify-between text-gray-600">
              <span>Gerente de Producto</span>
              <span class="text-yellow-500 font-bold">✔</span>
            </li>
            <li class="flex justify-between text-gray-600">
              <span>Analista de Datos</span>
              <span class="text-red-500 font-bold">✔</span>
            </li>
          </ul>
        </div>
      </div>


      <div class="bg-white shadow-lg rounded-xl p-6 mt-6">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Actividad Reciente</h2>
        <ul class="space-y-3">
          <li class="flex items-center gap-4 text-gray-600">
            <span class="w-4 h-4 bg-blue-600 rounded-full"></span>
            Nuevo usuario registrado: <span class="text-blue-600 font-bold">Juan Pérez</span>
          </li>
          <li class="flex items-center gap-4 text-gray-600">
            <span class="w-4 h-4 bg-green-600 rounded-full"></span>
            Nueva vacante publicada: <span class="text-green-600 font-bold">Frontend Developer</span>
          </li>
          <li class="flex items-center gap-4 text-gray-600">
            <span class="w-4 h-4 bg-yellow-500 rounded-full"></span>
            Categoría actualizada: <span class="text-yellow-500 font-bold">Marketing</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
