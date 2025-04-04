// postulanteService.ts
import apiClient from './api'
import type { CVResponse } from '@/interfaces/CVResponse'
import { AxiosError } from 'axios'

export const PostulanteService = {
  async uploadCV(file: File, idVacante: number): Promise<CVResponse> {
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
  },

  async checkExistingCV(idVacante: number): Promise<CVResponse | null> {
    try {
      const { data } = await apiClient.get<CVResponse>(`/api/CVs/check/${idVacante}`)
      return data
    } catch (error) {
      const axiosError = error as AxiosError
      if (axiosError.response?.status === 404) {
        return null
      }
      console.error('Error al verificar CV existente:', axiosError.response?.data)
      throw axiosError
    }
  },

  // postulanteService.ts
  async downloadMyCV(idVacante: number): Promise<Blob> {
    try {
      const response = await apiClient.get(`/api/CVs/download/${idVacante}`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error al descargar el CV:', axiosError.response?.data);
      throw axiosError;
    }
  }
}