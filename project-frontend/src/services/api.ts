import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7043", 
  headers: { "Content-Type": "application/json" },
});

// Interceptor para agregar el token a las solicitudes
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // El token debe guardarse en el LocalStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
    return data;
  } catch (error) {
    console.error(`Error al obtener la vacante con ID ${id}:`, error);
    throw error;
  }
};