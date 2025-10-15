import { Inscripcion } from '../models/inscripcion.model';

export const INSCRIPCIONES_DATA: Inscripcion[] = [
  {
    id: 1,
    alumnoId: 1,
    cursoId: 1,
    fechaInscripcion: new Date('2024-01-10'),
    estado: 'activa'
  },
  {
    id: 2,
    alumnoId: 1,
    cursoId: 2,
    fechaInscripcion: new Date('2024-01-25'),
    estado: 'activa'
  },
  {
    id: 3,
    alumnoId: 2,
    cursoId: 1,
    fechaInscripcion: new Date('2024-01-08'),
    estado: 'activa'
  },
  {
    id: 4,
    alumnoId: 3,
    cursoId: 3,
    fechaInscripcion: new Date('2024-01-18'),
    estado: 'activa'
  },
  {
    id: 5,
    alumnoId: 4,
    cursoId: 2,
    fechaInscripcion: new Date('2024-02-05'),
    estado: 'activa'
  },
  {
    id: 6,
    alumnoId: 5,
    cursoId: 4,
    fechaInscripcion: new Date('2024-02-08'),
    estado: 'activa'
  }
];
