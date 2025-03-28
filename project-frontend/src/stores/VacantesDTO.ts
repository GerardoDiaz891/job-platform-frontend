export interface VacanteDTO {
    id?: number; // Opcional porque al crear no tendrá ID
    nombre: string;
    descripcion: string;
    salario: number;
    horario: string;
    fechaPublicacion?: string | Date; // Opcional porque el backend la genera
    fechaExpiracion: string | Date;
    habilidadesRequeridas: string;
    ubicacion: string;
    tipoTrabajo: string;
    usuarioId?: number; // Opcional porque el backend lo asigna
    cVs?: CVDTO[]; // Opcional para la creación
  }
  
  export interface CVDTO {
    id?: number;
    rutaArchivo?: string;
    fechaSubida?: string | Date;
    idUsuario?: number;
    idVacante?: number;
  }