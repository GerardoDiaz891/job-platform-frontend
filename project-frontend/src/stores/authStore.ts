import { defineStore } from 'pinia'
import { AuthService } from '@/services/authService'
import type { LoginCredentials } from '@/interfaces/LoginCredentials'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('userData') || 'null'),
    isInitialized: false // RASTREAR INICIALIZACIÓN 
  }),
  actions: {
    async initializeAuth() {
      if (this.token && !this.user) {
        // INTENTAR RESTAURAR DESDE EL TOKEN SI NO HAY DATOS
        try {
          const { userData } = await AuthService.getProfile()
          this.user = userData
        } catch (error) {
          console.error('Error al restaurar sesión:', error)
          this.logout() // LIMPIAR SI HAY FALLAS
        }
      }
      this.isInitialized = true
    },
    async login(credentials: LoginCredentials) {
      try {
        const { token, userData } = await AuthService.login(credentials)
        this.token = token
        this.user = userData
        this.isInitialized = true
        return true
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },
    async logout() {
      try {
        //LLAMAR AL SERVICIO DE LOGOUT PARA INVALIDAR TOKEN EN EL BACKEND
        await AuthService.logout()
      } catch (error) {
        console.error('Failed to invalidate token on server:', error)
        // EVITAMOS INTERRUMPIR EL FLUJO DE LOGOUT EN LOCAL
      } finally {
        // LIMPIAMOS EL ESTADO LOCAL Y LOCALSTORAGE INDEPENDIENTEMENYE SI LA LLAMADA FALLA
        this.token = null
        this.user = null
        this.isInitialized = true
        localStorage.removeItem('token')
        localStorage.removeItem('userData')
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.user?.rol || null
  }
})