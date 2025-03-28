import { createRouter, createWebHistory } from 'vue-router'
import DadshbaordUsuario from '../views/Usuarios/DadshbaordUsuario.vue'
import PerfilEmpresa from '../views/Empresas/PerfilEmpresa.vue'
import NotFound from '../components/NotFound.vue'
import Vacante from '@/components/Vacante.vue'
import PerfilEmpresaVue from '../views/Empresas/PerfilEmpresa.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DadshbaordUsuario,
    },
    {
      path: '/PerfilEmpresa',
      component: PerfilEmpresaVue,
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
      path: '/admin/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/admin/DashboardView.vue'),
    },

    {
      path: '/:catchAll(.*)',
      component: NotFound,
    },
    {
      path: '/vacante/:id',
      name: 'Vacante',
      component: Vacante,
    },
    {
      path: "/admin/usuarios",
      name: "Usuarios",
      component: () => import("@/views/admin/UsuariosView.vue"),
    },
    {
      path: "/admin/create-user",
      name: "CreateUser",
      component: () => import("@/views/admin/CreateUserView.vue"),
    },
    {
      path: '/empresarial/vacantes',
      component: () => import('@/views/Empresas/VacantesEmpresarial.vue'),
      //meta: { requiresAuth: true, role: 'Empresarial' }
    },
    {
      path: '/empresarial/vacante/:id',
      component: () => import('@/views/Empresas/DetalleVacante.vue'),
      //meta: { requiresAuth: true, role: 'Empresarial' }
    },
    {
      path: '/empresarial/crear-vacante',
      component: () => import('@/views/Empresas/CrearVacante.vue'),
      //meta: { requiresAuth: true, role: 'Empresarial' }
    }
  ],
})

export default router
