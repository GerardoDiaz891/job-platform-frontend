import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7043", 
  headers: { "Content-Type": "application/json" },
});

export const getVacantes = async () => {
  try {
    const { data } = await apiClient.get("/api/Vacantes");
    return data;
  } catch (error) {
    console.error("Error al obtener las vacantes:", error);
    throw error;
  }
};
