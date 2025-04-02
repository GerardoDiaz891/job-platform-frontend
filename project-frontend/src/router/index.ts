import { createRouter, createWebHistory } from 'vue-router'
import DadshbaordUsuario from '@/views/Usuarios/DadshbaordUsuario.vue'
import PerfilEmpresaVue from '../views/Empresas/PerfilEmpresa.vue'
import NotFound from '../components/NotFound.vue'
import Vacante from '@/components/Vacante.vue"


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
      path: '/admin/usuarios',
      name: 'Usuarios',
      component: () => import('@/views/admin/UsuariosView.vue'),
    },
    {
      path: '/admin/create-user',
      name: 'CreateUser',
      component: () => import('@/views/admin/CreateUserView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userRole = localStorage.getItem('role')

  if (to.meta.requiereAuth && !token) {
    // Si la ruta requiere autenticación y no hay token, redirige a login
    next('/login')
  } else if (to.meta.requiereAdmin && userRole !== 'administrador') {
    // Si la ruta requiere permisos de administrador y el usuario no lo es, redirige a inicio
    next('/admin/dashboard')
  } else if (to.path === '/login' && token && userRole === 'administrador') {
    // Si un administrador intenta ir a login, redirigir al dashboard
    next('/')
  } else {
    next()
  }
})

export default router
