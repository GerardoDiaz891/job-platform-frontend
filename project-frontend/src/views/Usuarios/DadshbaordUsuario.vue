<template>
  <div class="app-container">
    <div class="content">
      <aside class="sidebar">
        <button>Sistemas</button>
        <button>Administración</button>
        <button>Enfermería</button>
        <button>Construcción</button>
        <button>Otros</button>
      </aside>
      <main class="job-listings">
        <JobCard v-for="n in 4" :key="n" />
      </main>
    </div>
  </div>
</template>

<script>
import JobCard from './jobCard.vue'
export default {
  components: { JobCard },
}
</script>

<style scoped>
html,
body,
.app-container {
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.content {
  display: flex;
  flex: 1;
  height: 100vh;
}

.sidebar {
  width: 200px;
  background: #f4f4f4;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.sidebar button {
  background: none;
  border: none;
  padding: 10px;
  text-align: left;
  cursor: pointer;
}

.job-listings {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
  flex-grow: 1;
  overflow-y: auto;
}
</style>
