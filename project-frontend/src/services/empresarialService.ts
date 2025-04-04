// empresarialService.ts
import apiClient from './api'
import type { VacanteDTO } from '@/interfaces/VacantesDTO'
import type { AxiosError } from 'axios'
import type { CVResponse } from '@/interfaces/CVResponse';

export const EmpresarialService = {
  async crearVacante(vacanteData: Omit<VacanteDTO, 'id' | 'fechaPublicacion' | 'usuarioId' | 'cVs'>): Promise<VacanteDTO> {
    try {
      const { data } = await apiClient.post<VacanteDTO>('/api/Vacantes', vacanteData)
      return data
    } catch (error: unknown) {
      const axiosError = error as AxiosError
      console.error('Error al crear vacante:', axiosError)
      throw axiosError
    }
  },

  async actualizarVacante(id: number, vacanteData: Partial<VacanteDTO>): Promise<VacanteDTO> {
    try {
      const { data } = await apiClient.put<VacanteDTO>(`/api/Vacantes/${id}`, vacanteData)
      return data
    } catch (error: unknown) {
      const axiosError = error as AxiosError
      console.error('Error al actualizar vacante:', axiosError)
      throw axiosError
    }
  },

  async downloadApplicantCV(idVacante: number, idUsuario: number): Promise<Blob> {
    try {
      const response = await apiClient.get(
        `/api/CVs/vacante/${idVacante}/usuario/${idUsuario}/download`,
        {
          responseType: 'blob'
        }
      )
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      console.error('Error al descargar CV del postulante:', axiosError.response?.data)
      throw axiosError
    }
  },

  async getApplicantsCVs(idVacante: number): Promise<CVResponse[]> {
    try {
      const { data } = await apiClient.get<CVResponse[]>(`/api/CVs/vacante/${idVacante}`)
      return data
    } catch (error) {
      const axiosError = error as AxiosError
      console.error('Error al obtener CVs de postulantes:', axiosError.response?.data)
      throw axiosError
    }
  }
}