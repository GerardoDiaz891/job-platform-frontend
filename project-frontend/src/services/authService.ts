import apiClient from './api';
import { AxiosError } from 'axios';
import type { LoginCredentials } from '@/interfaces/LoginCredentials';
import type { RegisterUserData } from '@/interfaces/RegisterUserData';
import type { UsuarioUpdateDTO } from '@/interfaces/UsuarioUpdateDTO';

export const AuthService = {
  async register(userData: RegisterUserData) {
    try {
      const { data } = await apiClient.post('/api/Auth/register', userData);
      return data;
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw error;
    }
  },

  async login(credentials: LoginCredentials) {
    try {
      const { data } = await apiClient.post('/api/Auth/login', credentials);
      localStorage.setItem('token', data.token);

      const payload = JSON.parse(atob(data.token.split('.')[1]));
      const userData = {
        id: parseInt(payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']),
        rol: payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        email: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
        exp: payload.exp, // Guardar la fecha de expiración
      };

      localStorage.setItem('userData', JSON.stringify(userData));
      return { token: data.token, userData };
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  },
  // Método para verificar si el token sigue siendo válido
  isTokenValid() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const exp = userData.exp;
    if (!exp) return false;

    const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    return currentTime < exp;
  },

  async getProfile() {
    try {
      const { data } = await apiClient.get('/api/Usuarios/mi-informacion');
      return data;
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      throw error;
    }
  },

  async updateProfile(updateData: UsuarioUpdateDTO) {
    try {
      const { data } = await apiClient.put('/api/Usuarios/mi-informacion', updateData);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error al actualizar perfil:', axiosError.response?.data || axiosError.message);
      throw axiosError;
    }
  },

  async logout() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await apiClient.post('/api/Auth/logout', null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Error al invalidar el token en el servidor:', error);
      }
    }
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  },

  checkTokenExpiration() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp * 1000;
        if (Date.now() >= exp) {
          this.logout();
          return true;
        }
        return false;
      } catch {
        this.logout();
        return true;
      }
    }
    return true;
  }
};