import type { LoginCredentials } from "@/stores/LoginCredentials";
import type { RegisterUserData } from "@/stores/RegisterUserData";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7043",
  headers: { "Content-Type": "application/json" },
});

// Interceptor para agregar el token a las solicitudes
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (userData: RegisterUserData) => {
  try {
    const { data } = await apiClient.post("/api/Auth/register", userData);
    return data;
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw error;
  }
};

export const loginUser = async (credentials: LoginCredentials) => {
  try {
    const { data } = await apiClient.post("/api/Auth/login", credentials);
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

//GET de todas las vacantes
export const getVacantes = async () => {
  try {
    const { data } = await apiClient.get("/api/Vacantes");
    return data;
  } catch (error) {
    console.error("Error al obtener las vacantes:", error);
    throw error;
  }
};

//GET vacante por ID
export const getVacanteById = async (id) => {
  try {
    const { data } = await apiClient.get(`/api/Vacantes/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    console.error(`Error al obtener la vacante con ID ${id}:`, error);
    throw error;
  }
};

export const postCV = async (formData) => {
  if (!formData || formData.get("file") === null) {
    throw new Error("El FormData está vacío o no contiene el archivo.");
  }

  try {
    const { data } = await apiClient.post(`/api/CVs/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("CV subido correctamente:", data);
    return data;
  } catch (error) {
    if (error.response) {
      console.error("Error del servidor:", error.response.status, error.response.data);
      throw new Error(`Error del servidor: ${error.response.data.message || "Algo salió mal."}`);
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor:", error.request);
      throw new Error("No se pudo conectar al servidor. Verifica tu conexión.");
    } else {
      console.error("Error inesperado:", error.message);
      throw new Error("Ocurrió un error inesperado.");
    }
  }
};
