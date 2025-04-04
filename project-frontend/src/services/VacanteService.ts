import apiClient from './api'
import type { VacanteDTO } from '@/interfaces/VacantesDTO'
import { AxiosError } from 'axios'

export const VacanteService = {
  // Vacantes públicas
  async getAllVacantes(): Promise<VacanteDTO[]> {
    try {
      const { data } = await apiClient.get<VacanteDTO[]>('/api/Vacantes')
      return data
    } catch (error) {
      const axiosError = error as AxiosError
      console.error('Error al obtener las vacantes:', axiosError.response?.data)
      throw new Error('Error al cargar las vacantes. Intenta nuevamente.')
    }
  },

  // Obtener Vacantes por ID
  async getVacanteById(id: number): Promise<VacanteDTO> {
    try {
      const { data } = await apiClient.get<VacanteDTO>(`/api/Vacantes/${id}`)
      return data
    } catch (error) {
      const axiosError = error as AxiosError
      console.error(`Error al obtener la vacante con ID ${id}:`, axiosError.response?.data)
      throw axiosError
    }
  }
}