import axios from 'axios';

// Crear el cliente de axios
const apiClient = axios.create({
  baseURL: 'https://localhost:7043',
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor para agregar el token a las solicitudes
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar respuestas con error 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token inválido o expirado, limpiar y redirigir al login
      clearAuthToken();
      window.location.href = '/login'; // Redirigir al login
    }
    return Promise.reject(error);
  }
);

// Función para limpiar el token y datos del usuario
export const clearAuthToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
};

export default apiClient;