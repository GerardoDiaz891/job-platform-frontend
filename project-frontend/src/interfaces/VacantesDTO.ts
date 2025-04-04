export interface VacanteDTO {
    id?: number;
    nombre: string;
    descripcion: string;
    salario: number;
    horario: string;
    fechaPublicacion?: string | Date;
    fechaExpiracion: string | Date;
    habilidadesRequeridas: string;
    ubicacion: string;
    tipoTrabajo: string;
    usuarioId?: number; 
    cVs?: CVDTO[]; 
  }
  
  export interface CVDTO {
    id?: number;
    rutaArchivo?: string;
    fechaSubida?: string | Date;
    idUsuario?: number;
    idVacante?: number;
  }