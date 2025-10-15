export interface Inscripcion {
  id: number;
  alumnoId: number;
  cursoId: number;
  fechaInscripcion: Date;
  estado: 'activa' | 'completada' | 'cancelada';
}
