import { Curso } from '../models/curso.model';

export const CURSOS_DATA: Curso[] = [
  {
    id: 1,
    nombre: 'Angular Avanzado',
    descripcion: 'Curso completo de Angular con las últimas características',
    duracion: 40,
    instructor: 'María García',
    fechaInicio: new Date('2024-01-15'),
    fechaFin: new Date('2024-03-15')
  },
  {
    id: 2,
    nombre: 'Node.js Fundamentos',
    descripcion: 'Aprende Node.js desde cero hasta proyectos complejos',
    duracion: 30,
    instructor: 'Carlos López',
    fechaInicio: new Date('2024-02-01'),
    fechaFin: new Date('2024-03-15')
  },
  {
    id: 3,
    nombre: 'TypeScript Profesional',
    descripcion: 'Domina TypeScript para aplicaciones empresariales',
    duracion: 25,
    instructor: 'Ana Martínez',
    fechaInicio: new Date('2024-01-20'),
    fechaFin: new Date('2024-03-01')
  },
  {
    id: 4,
    nombre: 'React Completo',
    descripcion: 'React desde básico hasta avanzado con hooks y context',
    duracion: 35,
    instructor: 'Pedro Sánchez',
    fechaInicio: new Date('2024-02-10'),
    fechaFin: new Date('2024-04-05')
  }
];
