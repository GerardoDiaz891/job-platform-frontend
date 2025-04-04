import apiClient from './api'

export const AdminService = {
  async createUsuario(usuario: any) {
    try {
      const { data } = await apiClient.post("/api/Usuarios", usuario)
      return data
    } catch (error: any) {
      console.error("Error al crear el usuario:", error.response?.data)
      throw new Error(error.response?.data?.toString() || 'Error al crear el usuario')
    }
  },

  async getUsuarios() {
    try {
      const { data } = await apiClient.get("/api/Usuarios")
      return data
    } catch (error) {
      console.error("Error al obtener los usuarios:", error)
      throw error
    }
  },

  async updateUsuario(id: number, usuario: any) {
    const { data } = await apiClient.put(`/api/Usuarios/${id}`, usuario)
    return data
  },

  async deleteUsuario(id: number) {
    await apiClient.delete(`/api/Usuarios/${id}`)
  },

  async getRoles() {
    try {
      const { data } = await apiClient.get('/api/Rols')
      return data
    } catch (error) {
      console.error('Error al obtener los roles:', error)
      throw error
    }
  },

  async createRol(rolData: { nombre: string }) {
    const { data } = await apiClient.post('/api/Rols', rolData)
    return data
  },

  async updateRol(id: number, data: { nombre: string }) {
    const response = await apiClient.put(`/api/Rols/${id}`, { 
      id: id,
      nombre: data.nombre 
    })
    return response.data
  },

  async deleteRol(id: number) {
    await apiClient.delete(`/api/Rols/${id}`)
  }
}