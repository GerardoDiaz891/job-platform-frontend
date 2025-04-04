import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://localhost:7043',
  headers: { 'Content-Type': 'application/json' },
})

// Interceptor para agregar el token a las solicitudes
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Función para logout que limpia el token
export const clearAuthToken = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userData')
  // También podrías agregar aquí una llamada al backend para invalidar el token
}

export default apiClient