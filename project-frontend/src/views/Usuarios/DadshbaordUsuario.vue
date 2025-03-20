<script setup>
import Vacantes from '@/components/Vacantes.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
</script>

<template>
  <HeaderComponent/>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-100">
    <h2 class="col-span-full text-2xl font-bold text-center mb-6">Vacantes Disponibles en el Sistema</h2>
    <Vacantes />
  </div>
  <FooterComponent/>
</template>