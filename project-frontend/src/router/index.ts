import { createRouter, createWebHistory } from 'vue-router'
import DadshbaordUsuario from '../views/Usuarios/DadshbaordUsuario.vue'
import NotFound from '../components/NotFound.vue'
import Vacante from '@/components/VacanteCard.vue'
import PerfilEmpresaVue from '../views/Empresas/PerfilEmpresa.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DadshbaordUsuario,
      beforeEnter: (to, from, next) => {
        const isAuthenticated = localStorage.getItem('token'); // O usa Vuex o Pinia
        if (!isAuthenticated) {
          next('/login'); // Redirige si no está autenticado
        } else {
          next(); // Continúa si está autenticado
        }
      }

    },
    {
      path: '/PerfilEmpresa',
      component: PerfilEmpresaVue,
      beforeEnter: (to, from, next) => {
        const isAuthenticated = localStorage.getItem('token'); // O usa Vuex o Pinia
        if (!isAuthenticated) {
          next('/login'); // Redirige si no está autenticado
        } else {
          next(); // Continúa si está autenticado
        }
      }
    },
    {
      path: '/Nosotros',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      beforeEnter: (to, from, next) => {
        const isAuthenticated = localStorage.getItem('token'); // O usa Vuex o Pinia
        if (!isAuthenticated) {
          next('/login'); // Redirige si no está autenticado
        } else {
          next(); // Continúa si está autenticado
        }
      }
    },

    {
      path: '/perfil-usuario',
      name: 'PerfilUsuario',
      component: () => import('../views/PerfilUsuario.vue'),
      beforeEnter: (to, from, next) => {
        const isAuthenticated = localStorage.getItem('token'); // O usa Vuex o Pinia
        if (!isAuthenticated) {
          next('/login'); // Redirige si no está autenticado
        } else {
          next(); // Continúa si está autenticado
        }
      }
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
      beforeEnter: (to, from, next) => {
        const isAuthenticated = localStorage.getItem('token'); // O usa Vuex o Pinia
        if (!isAuthenticated) {
          next('/login'); // Redirige si no está autenticado
        } else {
          next(); // Continúa si está autenticado
        }
      }
    },
    {
      path: '/Postulation',
      name: 'Postulation',
      component: () => import('../views/PostulationView.vue'),
      beforeEnter: (to, from, next) => {
        const isAuthenticated = localStorage.getItem('token'); // O usa Vuex o Pinia
        if (!isAuthenticated) {
          next('/login'); // Redirige si no está autenticado
        } else {
          next(); // Continúa si está autenticado
        }
      }
    },
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/admin/DashboardView.vue'),
    beforeEnter: (to, from, next) => {
        const isAuthenticated = localStorage.getItem('token'); // O usa Vuex o Pinia
        if (!isAuthenticated) {
          next('/login'); // Redirige si no está autenticado
        } else {
          next(); // Continúa si está autenticado
        }
      }
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
      beforeEnter: (to, from, next) => {
        const isAuthenticated = localStorage.getItem('token'); // O usa Vuex o Pinia
        if (!isAuthenticated) {
          next('/login'); // Redirige si no está autenticado
        } else {
          next(); // Continúa si está autenticado
        }
      }
    },
    {
      path: "/admin/create-user",
      name: "CreateUser",
      component: () => import("@/views/admin/CreateUserView.vue"),
      beforeEnter: (to, from, next) => {
        const isAuthenticated = localStorage.getItem('token'); // O usa Vuex o Pinia
        if (!isAuthenticated) {
          next('/login'); // Redirige si no está autenticado
        } else {
          next(); // Continúa si está autenticado
        }
      }
    },
    {
      path: "/admin/roles",
      name: "Roles",
      component: () => import("@/views/admin/RolesView.vue"),
      beforeEnter: (to, from, next) => {
        const isAuthenticated = localStorage.getItem('token'); // O usa Vuex o Pinia
        if (!isAuthenticated) {
          next('/login'); // Redirige si no está autenticado
        } else {
          next(); // Continúa si está autenticado
        }
      }
    },
    //RUTAS DE USUARIO EMPRESARIAL
    {
      path: '/empresarial/vacantes',
      component: () => import('@/views/Empresas/VacantesEmpresarial.vue'),

      beforeEnter: (to, from, next) => {
        const isAuthenticated = localStorage.getItem('token'); // O usa Vuex o Pinia
        if (!isAuthenticated) {
          next('/login'); // Redirige si no está autenticado
        } else {
          next(); // Continúa si está autenticado
        }
      }
    },
    {
      path: '/empresarial/vacante/:id',
      component: () => import('@/views/Empresas/DetalleVacante.vue'),
      beforeEnter: (to, from, next) => {
        const isAuthenticated = localStorage.getItem('token'); // O usa Vuex o Pinia
        if (!isAuthenticated) {
          next('/login'); // Redirige si no está autenticado
        } else {
          next(); // Continúa si está autenticado
        }
      }
    },
    {
      path: '/empresarial/crear-vacante',
      component: () => import('@/views/Empresas/CrearVacante.vue'),
      beforeEnter: (to, from, next) => {
        const isAuthenticated = localStorage.getItem('token'); // O usa Vuex o Pinia
        if (!isAuthenticated) {
          next('/login'); // Redirige si no está autenticado
        } else {
          next(); // Continúa si está autenticado
        }
      }
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