export enum AlumnoPerfil {
  DESARROLLADOR = 'Desarrollador',
  IT = 'IT',
  USUARIO_FINAL = 'Usuario Final',
  OTRO = 'Otro'
}

export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: Date;
  telefono: string;
  dni: string;
  perfil: AlumnoPerfil;
}
