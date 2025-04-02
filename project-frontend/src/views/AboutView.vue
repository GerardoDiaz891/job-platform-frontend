<script setup>
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
</script>

<template>

  <HeaderComponent/>
  <section class="bg-gray-100 py-16 px-6">
    <div class="max-w-5xl mx-auto text-center">
      <h2 class="text-4xl font-extrabold text-gray-800 mb-6">Sobre GetWork</h2>
      <p class="text-lg text-gray-600 mb-8">
        GetWork es una plataforma innovadora diseñada para conectar empresas con talento en búsqueda de nuevas oportunidades.
        Facilitamos la publicación de vacantes de trabajo y ayudamos a los candidatos a encontrar el empleo ideal de manera rápida y sencilla.
      </p>
    </div>

    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="bg-white p-6 rounded-2xl shadow-lg text-center">
        <h3 class="text-2xl font-semibold text-blue-600">Facilidad</h3>
        <p class="text-gray-600 mt-2">Publica y gestiona vacantes con unos pocos clics.</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-lg text-center">
        <h3 class="text-2xl font-semibold text-blue-600">Conexión</h3>
        <p class="text-gray-600 mt-2">Acerca a empresas y talentos en un solo lugar.</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-lg text-center">
        <h3 class="text-2xl font-semibold text-blue-600">Eficiencia</h3>
        <p class="text-gray-600 mt-2">Encuentra el empleo ideal en cuestión de minutos.</p>
      </div>
    </div>
    <br>
    <br>
    <br>
    <div class="max-w-5xl mx-auto text-center mt-12">
      <h3 class="text-3xl font-bold text-gray-800">Nuestra misión</h3>
      <p class="text-lg text-gray-600 mt-4">
        En GetWork, nos comprometemos a simplificar el proceso de búsqueda de empleo y contratación,
        brindando herramientas eficientes tanto para reclutadores como para candidatos.
      </p>
      <br>
    </div>
    <br>
    <br>
  </section>


  <FooterComponent />
</template>
