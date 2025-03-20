<template>
  <header>
    <nav class="navbar">
      <div><img class="logodata" src="@/assets/trans.png" alt="Logo" /></div>
      <div class="nav-links">
        <a href="/"> <button class="active">Vacantes</button> </a>
        <a href="/PerfilEmpresa"><button>Perfil empresa</button></a>
        <button>Preguntas frecuentes</button>
      </div>
    </nav>
  </header>
</template>

<script setup>
</script>

<style scoped>
.wrapper {
  margin-top: 20px;
}

.app-container {
  display: flex;
  flex-direction: column;
}

.logodata {
  width: 50px;
  height: 50px;
}

.navbar {
  background: #007bff;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links button {
  background: transparent;
  border: none;
  color: white;
  margin-left: 1rem;
  cursor: pointer;
}

.nav-links .active {
  background: #0056b3;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}
</style>