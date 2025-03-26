import { defineStore } from "pinia";
import { postCV } from "@/services/api.ts"; // Importación correcta del servicio

export const useCVStore = defineStore("cv", {
  state: () => ({
    isLoading: false,
    error: null,
    successMessage: null,
    vacanteId: null, // ID de la vacante
    usuarioId: null, // ID del usuario
  }),

  actions: {
    setVacanteId(id: string) {
      this.vacanteId = id;
    },

    setUsuarioId(id: string) {
      this.usuarioId = id;
    },

    async uploadCV(file: File) {
      this.isLoading = true;
      this.error = null;
      this.successMessage = null;

      if (!this.usuarioId) {
        console.error("Usuario ID no configurado.");
        this.error = "El usuario no está configurado. Verifica el inicio de sesión.";
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("usuarioId", this.usuarioId);
      formData.append("idVacante", this.vacanteId);

      try {
        const response = await postCV(formData); // Aquí llamamos a postCV
        this.successMessage = "¡CV subido con éxito!";
        console.log("Respuesta del servidor:", response);
      } catch (error) {
        if (error.response) {
          console.error("Error del servidor:", error.response.status, error.response.data);
          this.error = error.response.data.message || "Algo salió mal.";
        } else {
          console.error("Error inesperado:", error.message);
          this.error = "Ocurrió un error inesperado. Verifica la conexión.";
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
});
