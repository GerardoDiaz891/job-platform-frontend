import { createRouter, createWebHistory } from 'vue-router'
import DadshbaordUsuario from '../views/Usuarios/DadshbaordUsuario.vue'
import PerfilEmpresa from '../views/Empresas/PerfilEmpresa.vue'
import VacantesView from '@/views/VacantesView.vue';
import NotFound from '../components/NotFound.vue';

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
      component: () => import('../views/PerfilUsuario.vue'), 
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'), 
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
    },
    {
      path: '/:catchAll(.*)',
      component: NotFound,
    },
  ]
}
)
  


export default router
