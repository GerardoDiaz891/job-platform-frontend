import { createRouter, createWebHistory } from 'vue-router'
import DadshbaordUsuario from '../views/Usuarios/DadshbaordUsuario.vue'
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
      path: '/vacante/:id',
      name: 'Vacante',
      component: Vacante,
      meta: { title: 'Detalle Vacante - EmpleoLink' }
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
    //RUTAS DE USUARIO EMPRESARIAL
    {
      path: '/empresarial/vacantes',
      component: () => import('@/views/Empresas/VacantesEmpresarial.vue'),

    },
    {
      path: '/empresarial/vacante/:id',
      component: () => import('@/views/Empresas/DetalleVacante.vue'),
    },
    {
      path: '/empresarial/crear-vacante',
      component: () => import('@/views/Empresas/CrearVacante.vue'),
    },
    // Ruta 404
    {
      path: '/:catchAll(.*)',
      component: NotFound,
      meta: { title: 'Página no encontrada' }
    }
  ]
})

export default router