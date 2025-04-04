// authService.ts
import apiClient from './api'
import { AxiosError } from 'axios'
import type { LoginCredentials } from '@/interfaces/LoginCredentials'
import type { RegisterUserData } from '@/interfaces/RegisterUserData'
import type { UsuarioUpdateDTO } from '@/interfaces/UsuarioUpdateDTO'
import { clearAuthToken } from '@/services/api'

export const AuthService = {
  async register(userData: RegisterUserData) {
    try {
      const { data } = await apiClient.post('/api/Auth/register', userData)
      return data
    } catch (error) {
      console.error('Error al registrar el usuario:', error)
      throw error
    }
  },

  async login(credentials: LoginCredentials) {
    try {
      const { data } = await apiClient.post('/api/Auth/login', credentials)
      localStorage.setItem('token', data.token)

      const payload = JSON.parse(atob(data.token.split('.')[1]))
      const userData = {
        id: parseInt(payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']), // Corrige el claim
        rol: payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        email: payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/emailaddress'] // Corrige el claim
      }

      localStorage.setItem('userData', JSON.stringify(userData))
      return { token: data.token, userData }
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      throw error
    }
  },

  async getProfile() {
    try {
      const { data } = await apiClient.get('/api/Usuarios/mi-informacion')
      return data
    } catch (error) {
      console.error('Error al obtener perfil:', error)
      throw error
    }
  },

  async updateProfile(updateData: UsuarioUpdateDTO) {
    try {
      const { data } = await apiClient.put('/api/Usuarios/mi-informacion', updateData)
      return data
    } catch (error) {
      const axiosError = error as AxiosError
      console.error('Error al actualizar perfil:', axiosError.response?.data || axiosError.message)
      throw axiosError
    }
  },

    logout() {
    clearAuthToken()
  }
}