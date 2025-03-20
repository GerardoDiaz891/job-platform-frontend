<template>
  <div class="job-card">
    <div class="job-image">
      <img
        src="https://img.pikbest.com/png-images/20241118/job-logo-design-png-_11101892.png!sw800"
        alt="Company Logo"
      />
    </div>
    <div class="job-info">
      <h3>Ingeniero de diseño-Sistemas</h3>
      <p style="color: black">
        Su trabajo se centra en la creación de modelos geotécnicos, diseño de excavaciones,
        planificación de producción y selección de equipos para garantizar la eficiencia y seguridad
        en las operaciones mineras.
      </p>
      <div class="job-meta">
        <span>📍 En remoto</span>
        <span>⏳ Jornada completa</span>
        <span>⚙️ Intermedio</span>
      </div>
      <button class="apply-btn">Contactar</button>
      <p class="time-posted">Hace 10 Horas</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobCard',
}
</script>

<style scoped>
html,
body,
.job-card {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.job-card {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
}

.job-image img {
  width: 100px;
  height: 100px;
}

.job-info h3 {
  color: #007bff;
  text-align: center;
}

.job-meta {
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  color: #555;
  align-items: center;
}

.apply-btn {
  background: #007bff;
  color: rgb(34, 33, 33);
  border: none;
  padding: 1rem;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
}

.time-posted {
  font-size: 1rem;
  color: #777;
  text-align: center;
}
</style>
