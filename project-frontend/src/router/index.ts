import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DadshbaordUsuario from '../views/Usuarios/DadshbaordUsuario.vue'
import PerfilEmpresa from '../views/Empresas/PerfilEmpresa.vue'
import VacantesView from '@/views/VacantesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DadshbaordUsuario,
    },
    {
      path: '/PerfilEmpresa',
      component: PerfilEmpresa,
    },
    {
      path: '/Nosotros',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/perfil-usuario',
      name: 'PerfilUsuario',
      component: () => import('../views/PerfilUsuario.vue'), // 👈 Agregamos la vista de Perfil de Usuario
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'), // 👈 Agregamos la vista de Login
    },
    {
      path: '/Register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'), 
    },
    {
      path: '/UploadCV',
      name: 'UploadCV',
      component: () => import('../views/UploadCVView.vue'), 
    },
    {
      path: '/Postulation',
      name: 'Postulation',
      component: () => import('../views/PostulationView.vue'), 
    },
    {
      path: "/admin/dashboard",
      name: "Dashboard",
      component: () => import("@/views/admin/DashboardView.vue"),
    },
    {
      path: '/vacantes',
      name: 'vacantes',
      component: VacantesView,
    }
  ]
}
)
  


export default router
