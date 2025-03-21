
export interface RegisterUserData {
  nombre: string;
  correo: string;
  contraseña: string;
  idRol: number;
  nombreRol: string;
  nombreEmpresa?: string;
  tipoEmpresa?: string; 
  direccion?: string; 
  telefono?: string; 
  sitioWeb?: string; 
  descripcionEmpresa?: string;
  idCV?: number;    
}