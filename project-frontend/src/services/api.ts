import type { LoginCredentials } from '@/stores/LoginCredentials'
import type { RegisterUserData } from '@/stores/RegisterUserData'
import type { CVResponse } from '@/stores/CVResponse'
import type { VacanteDTO } from '@/stores/VacantesDTO'

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

// MODULO DE LOGIN Y REGISTRO
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
    const { data } = await apiClient.post('/api/Auth/login', credentials);
    localStorage.setItem('token', data.token);
    
    // Decodificar el token para obtener información
    const payload = JSON.parse(atob(data.token.split('.')[1]));
    const userData = {
      id: parseInt(payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/nameidentifier']),
      rol: payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
      email: payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/email']
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    
    return { token: data.token, userData };
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

// MODULO DE PERFILES DE USUARIO
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

//MODULO DE VACANTES GENERALES
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

// MODULO DE CVS (POSTULANTE)
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

//MODULO DE VACANTES (EMPRESARIAL)
export const getVacantesEmpresarial = async (): Promise<VacanteDTO[]> => {
  try {
    const { data } = await apiClient.get<VacanteDTO[]>('/api/Vacantes/mis-vacantes');
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                       'Error al cargar tus vacantes. Intenta nuevamente.';
    console.error('Error en getVacantesEmpresarial:', {
      error: error.message,
      response: error.response?.data
    });
    throw new Error(errorMessage);
  }
};

// Crear vacante
export const crearVacante = async (vacanteData: Omit<VacanteDTO, 'id' | 'fechaPublicacion' | 'usuarioId' | 'cVs'>): Promise<VacanteDTO> => {
  try {
    const { data } = await apiClient.post<VacanteDTO>('/api/Vacantes', vacanteData);
    return data;
  } catch (error) {
    console.error('Error al crear vacante:', error);
    throw error;
  }
};

export const actualizarVacante = async (id: number, vacanteData: Partial<VacanteDTO>): Promise<VacanteDTO> => {
  const { data } = await apiClient.put<VacanteDTO>(`/api/Vacantes/${id}`, vacanteData);
  return data;
};

// MODULO DE ADMIN (USUARIOS)
//POST Usuarios
export const createUsuario = async (usuario: any) => {
  try {
    // Asegurarse de que la contraseña esté hasheada antes de enviar
    const userToSend = {
      ...usuario,
      contraseña: usuario.contraseña // El backend se encarga del hashing
    };
    
    const { data } = await apiClient.post("/api/Usuarios", userToSend);
    return data;
  } catch (error: any) {
    console.error("Error al crear el usuario:", error.response?.data);
    throw new Error(error.response?.data?.toString() || 'Error al crear el usuario');
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

export const updateUsuario = async (id: number, usuario: any) => {
  const { data } = await apiClient.put(`/api/Usuarios/${id}`, usuario);
  return data;
};

// Eliminar usuario
export const deleteUsuario = async (id: number) => {
  await apiClient.delete(`/api/Usuarios/${id}`);
};

// MODULO DE ADMIN (ROLES)
// GET Roles
export const getRoles = async () => {
  try {
    const { data } = await apiClient.get('/api/Rols')
    return data
  } catch (error) {
    console.error('Error al obtener los roles:', error)
    throw error
  }
}

//Crear rol
export const createRol = async (rolData: { nombre: string }) => {
  const { data } = await apiClient.post('/api/Rols', rolData);
  return data;
};

export const updateRol = async (id: number, data: { nombre: string }) => {
  const response = await apiClient.put(`/api/Rols/${id}`, { 
    id: id,
    nombre: data.nombre 
  });
  return response.data;
};

//Eliminar Rol
export const deleteRol = async (id: number) => {
  await apiClient.delete(`/api/Rols/${id}`);
};


