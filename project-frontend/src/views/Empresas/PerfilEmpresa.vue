<template>
  <HeaderComponent />
  <div class="company-profile">
    <div class="profile-header">
      <h1>Datos de la empresa</h1>
    </div>
    <div class="profile-content">
      <label>Nombre de la empresa</label>
      <input v-model="name" type="text" placeholder="Nombre de la empresa" />

      <label>Descripción de la Empresa</label>
      <textarea v-model="description" placeholder="Describe tu empresa..."></textarea>

      <label>Ubicación</label>
      <input v-model="location" type="text" placeholder="Ciudad, País" />

      <label>Correo Electrónico</label>
      <input v-model="email" type="email" placeholder="empresa@email.com" />

      <label>Número de Teléfono</label>
      <input v-model="phone" type="tel" placeholder="+123 456 7890" />

      <button>Guardar Perfil</button>
    </div>
  </div>
  <FooterComponent />
</template>

<script setup>
import { ref } from 'vue'
import FooterComponent from '@/components/FooterComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import { perfilUSer } from '@/services/api'
import { updateUser } from '@/services/api'

import { onMounted } from 'vue'

let description = ref('')
let location = ref('')
let email = ref('')
let name = ref('')
let phone = ref('')

async function nameS() {
  const dataInfo = await perfilUSer()
  let id = dataInfo.id
  console.log(dataInfo)
  description.value = dataInfo.descripcionEmpresa
  location.value = dataInfo.direccion
  name.value = dataInfo.nombre
  email.value = dataInfo.correo
  phone.value = dataInfo.telefono

  // const data = {
  //   nombre: 'hola',
  //   id: id,
  // }
  // const update = await updateUser(id, { Id: id, Nombre: 'hola mundo' })
  // console.log(update)
}

onMounted(async () => {
  await nameS()
  console.log(`the component is now mounted.`)
})
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
  margin: 3rem auto; /* Agregado margen superior */
  background: #ececed;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-header {
  text-align: center;
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
