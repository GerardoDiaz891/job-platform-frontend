<script setup>
import Vacantes from '@/components/Vacantes.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
</script>

<template>
  <HeaderComponent/>
  <main class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <Vacantes />
    </div>
  </main>
  <FooterComponent/>
</template>

<style>
.container {
  max-width: 1280px;
}
</style>