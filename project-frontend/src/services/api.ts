import type { LoginCredentials } from '@/stores/LoginCredentials'
import type { RegisterUserData } from '@/stores/RegisterUserData'
import type { CVResponse } from '@/stores/CVResponse'
import axios, { AxiosError } from 'axios'

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

export const registerUser = async (userData: RegisterUserData) => {
  try {
    const { data } = await apiClient.post('/api/Auth/register', userData)
    return data
  } catch (error) {
    console.error('Error al registrar el usuario:', error)
    throw error
  }
}

export const loginUser = async (credentials: LoginCredentials) => {
  try {
    const { data } = await apiClient.post('/api/Auth/login', credentials)
    localStorage.setItem('token', data.token)
    console.log('Usuario logueado:', data)
    const payload = JSON.parse(atob(data.token.split('.')[1])) // Decodifica el token
    console.log(
      'Usuario logueado:',
      payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
    )

    return data
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    throw error
  }
}
export const perfilUSer = async () => {
  const { data } = await apiClient.get('/api/Usuarios/mi-informacion')
  // localStorage.setItem('token', data.token)
  return data
}

export const updateUser = async (id: number, update: any) => {
  try {
    const { data } = await apiClient.put(`/api/Usuarios/${id}`, update)
    return data
  } catch (error) {
    console.error('Error al actualizar el usuario:', error)
    throw error
  }
}


//GET de todas las vacantes
export const getVacantes = async () => {
  try {
    const { data } = await apiClient.get('/api/Vacantes')
    return data
  } catch (error) {
    console.error('Error al obtener las vacantes:', error)
    throw error
  }
}

//GET vacante por ID
export const getVacanteById = async (id: number) => {
  try {
    const { data } = await apiClient.get(`/api/Vacantes/${id}`)
    return data
  } catch (error) {
    console.error(`Error al obtener la vacante con ID ${id}:`, error)
    throw error
  }
}

// Modulo de CVs
export const uploadCV = async (file: File, idVacante: number): Promise<CVResponse> => {
  const formData = new FormData()
  formData.append('file', file)
  
  try {
    const { data } = await apiClient.post<CVResponse>(
      `/api/CVs/upload/${idVacante}`, 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return data
  } catch (error) {
    const axiosError = error as AxiosError
    console.error('Error al subir el CV:', axiosError.response?.data)
    throw axiosError
  }
}

export const checkExistingCV = async (idVacante: number): Promise<CVResponse | null> => {
  try {
    const { data } = await apiClient.get<CVResponse>(`/api/CVs/download/${idVacante}`)
    return data
  } catch (error) {
    const axiosError = error as AxiosError
    if (axiosError.response?.status === 404) {
      return null // No existe CV para vacante!!
    }
    console.error('Error al verificar CV existente:', axiosError.response?.data)
    throw axiosError
  }
}

export const downloadCV = async (idVacante: number): Promise<Blob> => {
  try {
    const response = await apiClient.get(`/api/CVs/download/${idVacante}`, {
      responseType: 'blob'
    })
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    console.error('Error al descargar el CV:', axiosError.response?.data)
    throw axiosError
  }
};

//Usuarios GET
export const getUsuarios = async () => {
  try {
    const { data } = await apiClient.get("/api/Usuarios");
    return data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};