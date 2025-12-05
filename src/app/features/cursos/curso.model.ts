export interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  duracionHoras: number;
  cantidadClases: number;
  fechaInicio: Date;
  fechaFin: Date;
  cupoMaximo: number;
  profesor: string;
}
