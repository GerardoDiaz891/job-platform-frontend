import { createRouter, createWebHistory } from 'vue-router'
import DadshbaordUsuario from '../views/Usuarios/DadshbaordUsuario.vue'
import NotFound from '../components/NotFound.vue'
import Vacante from '@/components/Vacante.vue'
import PerfilEmpresaVue from '../views/Empresas/PerfilEmpresa.vue'
import { authGuard } from './authGuard'; // importa la función

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DadshbaordUsuario,
      beforeEnter: authGuard,

    },
    {
      path: '/PerfilEmpresa',
      component: PerfilEmpresaVue,
      beforeEnter: authGuard,
    },
    {
      path: '/Nosotros',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      beforeEnter: authGuard,
    },

    {
      path: '/perfil-usuario',
      name: 'PerfilUsuario',
      component: () => import('../views/PerfilUsuario.vue'),
      beforeEnter: authGuard,
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
      beforeEnter: authGuard,
    },
    {
      path: '/Postulation',
      name: 'Postulation',
      component: () => import('../views/PostulationView.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/admin/DashboardView.vue'),
      beforeEnter: authGuard,
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
      beforeEnter: authGuard,
    },
    {
      path: "/admin/create-user",
      name: "CreateUser",
      component: () => import("@/views/admin/CreateUserView.vue"),
      beforeEnter: authGuard,
    },
    {
      path: "/admin/roles",
      name: "Roles",
      component: () => import("@/views/admin/RolesView.vue"),
      beforeEnter: authGuard,
    },
    //RUTAS DE USUARIO EMPRESARIAL
    {
      path: '/empresarial/vacantes',
      component: () => import('@/views/Empresas/VacantesEmpresarial.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/empresarial/vacante/:id',
      component: () => import('@/views/Empresas/DetalleVacante.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/empresarial/crear-vacante',
      component: () => import('@/views/Empresas/CrearVacante.vue'),
      beforeEnter: authGuard,
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