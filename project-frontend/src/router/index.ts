import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

import DashboardUsuario from '../views/Usuarios/DadshbaordUsuario.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import Vacante from '@/components/VacanteCard.vue'
import PerfilEmpresaVue from '../views/Empresas/PerfilEmpresa.vue'
import VacantesEmpresarial from '@/views/Empresas/VacantesEmpresarial.vue'
import NotFound from '../components/NotFound.vue'

const routes = [
  // Rutas Públicas
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { isPublic: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: { isPublic: true }
  },

  // Rutas Generales Protegidas
  {
    path: '/',
    name: 'Home',
    component: DashboardUsuario,
    meta: { requiresAuth: true }
  },
  {
    path: '/nosotros',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/vacante/:id',
    name: 'VacanteDetail',
    component: Vacante,
    meta: { requiresAuth: true, title: 'Detalle Vacante - EmpleoLink' }
  },

  // Rutas para Postulantes
  {
    path: '/perfil-usuario',
    name: 'UserProfile',
    component: () => import('../views/PerfilUsuario.vue'),
    meta: { requiresAuth: true, allowedRoles: ['Postulante'] }
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

  // Rutas para Empresariales
  {
    path: '/perfilempresa',
    name: 'CompanyProfile',
    component: PerfilEmpresaVue,
    meta: { requiresAuth: true, allowedRoles: ['Empresarial'] }
  },
  {
    path: '/empresarial/vacantes',
    name: 'CompanyVacancies',
    component: VacantesEmpresarial,
    meta: { requiresAuth: true, allowedRoles: ['Empresarial'] }
  },
  {
    path: '/empresarial/vacante/:id',
    name: 'CompanyVacancyDetail',
    component: () => import('@/views/Empresas/DetalleVacante.vue'),
    meta: { requiresAuth: true, allowedRoles: ['Empresarial'] }
  },
  {
    path: '/empresarial/crear-vacante',
    name: 'CreateVacancy',
    component: () => import('@/views/Empresas/CrearVacante.vue'),
    meta: { requiresAuth: true, allowedRoles: ['Empresarial'] }
  },

  // Rutas para Administradores
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import('@/views/admin/DashboardView.vue'),
    meta: { requiresAuth: true, allowedRoles: ['Administrador'] }
  },
  {
    path: '/admin/usuarios',
    name: 'AdminUsers',
    component: () => import('@/views/admin/UsuariosView.vue'),
    meta: { requiresAuth: true, allowedRoles: ['Administrador'] }
  },
  {
    path: '/admin/create-user',
    name: 'AdminCreateUser',
    component: () => import('@/views/admin/CreateUserView.vue'),
    meta: { requiresAuth: true, allowedRoles: ['Administrador'] }
  },
  {
    path: '/admin/roles',
    name: 'AdminRoles',
    component: () => import('@/views/admin/RolesView.vue'),
    meta: { requiresAuth: true, allowedRoles: ['Administrador'] }
  },

  // Ruta 404
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
    meta: { title: 'Página no encontrada' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Guardia de navegación global
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated
  const userRole = authStore.userRole

  // Depuración (puedes quitarlo después de verificar)
  console.log(`Navegando a: ${to.path} | Autenticado: ${isAuthenticated} | Rol: ${userRole}`)

  if (to.meta.isPublic) return next()
  if (to.meta.requiresAuth && !isAuthenticated) return next('/login')
  if (to.meta.allowedRoles && !to.meta.allowedRoles.includes(userRole)) return next('/')

  next()
})

export default router