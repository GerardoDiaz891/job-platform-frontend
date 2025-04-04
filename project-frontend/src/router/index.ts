import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import DadshbaordUsuario from '../views/Usuarios/DadshbaordUsuario.vue'
import NotFound from '../components/NotFound.vue'
import Vacante from '@/components/VacanteCard.vue'
import PerfilEmpresaVue from '../views/Empresas/PerfilEmpresa.vue'

const routes = [
  // RUTAS PÚBLICAS
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { isPublic: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta: { isPublic: true }
  },

  // RUTAS PROTEGIDAS GENERALES
  {
    path: '/',
    component: DadshbaordUsuario,
    meta: { requiresAuth: true }
  },
  {
    path: '/perfil-usuario',
    name: 'PerfilUsuario',
    component: () => import('../views/PerfilUsuario.vue'),
    meta: { requiresAuth: true, allowedRoles: ['Postulante'] }
  },
  {
    path: '/nosotros',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/uploadcv',
    name: 'UploadCV',
    component: () => import('../views/UploadCVView.vue'),
    meta: { requiresAuth: true, allowedRoles: ['Postulante'] }
  },
  {
    path: '/postulation',
    name: 'Postulation',
    component: () => import('../views/PostulationView.vue'),
    meta: { requiresAuth: true, allowedRoles: ['Postulante'] }
  },
  {
    path: '/vacante/:id',
    name: 'Vacante',
    component: Vacante,
    meta: { requiresAuth: true, title: 'Detalle Vacante - EmpleoLink' }
  },

  // RUTAS DE USUARIO EMPRESARIAL
  {
    path: '/perfilempresa',
    component: PerfilEmpresaVue,
    meta: { requiresAuth: true, allowedRoles: ['Empresarial'] }
  },
  {
    path: '/empresarial/vacantes',
    component: () => import('@/views/Empresas/VacantesEmpresarial.vue'),
    meta: { requiresAuth: true, allowedRoles: ['Empresarial'] }
  },
  {
    path: '/empresarial/vacante/:id',
    component: () => import('@/views/Empresas/DetalleVacante.vue'),
    meta: { requiresAuth: true, allowedRoles: ['Empresarial'] }
  },
  {
    path: '/empresarial/crear-vacante',
    component: () => import('@/views/Empresas/CrearVacante.vue'),
    meta: { requiresAuth: true, allowedRoles: ['Empresarial'] }
  },

  // RUTAS DE ADMINISTRAODR
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/admin/DashboardView.vue'),
    meta: { requiresAuth: true, allowedRoles: ['Administrador'] }
  },
  {
    path: '/admin/usuarios',
    name: 'Usuarios',
    component: () => import('@/views/admin/UsuariosView.vue'),
    meta: { requiresAuth: true, allowedRoles: ['Administrador'] }
  },
  {
    path: '/admin/create-user',
    name: 'CreateUser',
    component: () => import('@/views/admin/CreateUserView.vue'),
    meta: { requiresAuth: true, allowedRoles: ['Administrador'] }
  },
  {
    path: '/admin/roles',
    name: 'Roles',
    component: () => import('@/views/admin/RolesView.vue'),
    meta: { requiresAuth: true, allowedRoles: ['Administrador'] }
  },

  // RUTA 404
  {
    path: '/:catchAll(.*)',
    component: NotFound,
    meta: { title: 'Página no encontrada' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// GUARDIA DE NAVEGACIÓ GLOBAL
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated
  const userRole = authStore.userRole

  // RUTAS PÚBLICAS
  if (to.meta.isPublic) {
    return next()
  }

  // REDIRIGIR AL LOGIN SI NECESITA AUTENTICACIÓN
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login')
  }

  // VERIFICAR QUE EL USUARIO TENGA ROLES PERMITIDOS
  if (to.meta.allowedRoles && !to.meta.allowedRoles.includes(userRole)) {
    return next('/')
  }
  next()
})

export default router