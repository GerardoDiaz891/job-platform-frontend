import { defineStore } from 'pinia'
import { AuthService } from '@/services/authService'
import type { LoginCredentials } from '@/interfaces/LoginCredentials'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('userData') || 'null')
  }),
  actions: {
    async login(credentials: LoginCredentials) {
      try {
        const { token, userData } = await AuthService.login(credentials)
        this.token = token
        this.user = userData
        return true
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('userData')
      // Opcional: llamar al backend para invalidar el token
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.user?.rol || null
  }
})