export interface Inscripcion {
  id: number;
  alumnoId: number;
  alumnoNombre?: string;
  cursoId: number;
  cursoNombre?: string;
  fechaInscripcion: Date;
  estado: 'Activa' | 'Completada' | 'Cancelada';
  calificacion?: number;
}
