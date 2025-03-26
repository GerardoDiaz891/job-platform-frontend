<template>
  <div class="company-profile">
    <div class="profile-header">

      <h1>Datos de la empresa</h1>
    </div>
    <div class="profile-content">
      <label>Nombre de la empresa</label>
      <input v-model="company.name" type="text" placeholder="Nombre de la empresa" />

      <label>Descripción de la Empresa</label>
      <textarea v-model="company.description" placeholder="Describe tu empresa..."></textarea>

      <label>Ubicación</label>
      <input v-model="company.location" type="text" placeholder="Ciudad, País" />

      <label>Correo Electrónico</label>
      <input v-model="company.email" type="email" placeholder="empresa@email.com" />

      <label>Número de Teléfono</label>
      <input v-model="company.phone" type="tel" placeholder="+123 456 7890" />

      <button @click="saveProfile">Guardar Perfil</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompanyProfile',
  data() {
    return {
      company: {
        description: '',
        location: '',
        email: '',
        phone: '',
        name: '',
      },
    }
  },
  methods: {
    saveProfile() {
      console.log('Perfil guardado:', this.company)
    },
  },
}
</script>

<style scoped>
h1 {
  color: black;
}
.company-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 600px;
  margin: auto;
  background: #ececed;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-header {
  text-align: center;
}

.company-logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.profile-content {
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-weight: bold;
  color: black;
}

input,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background: #007bff;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>

