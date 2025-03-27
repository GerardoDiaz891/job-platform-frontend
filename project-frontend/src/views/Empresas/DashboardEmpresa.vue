<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import VacantesEmpresa from '@/components/VacantesEmpres.vue';
</script>

<template>
  <HeaderComponent/>
  <main class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <VacantesEmpresa/>
    </div>
  </main>
  <FooterComponent/>
</template>

<style>
/* Opcional: Estilos globales para el layout */
.container {
  max-width: 1280px;
}
</style>
