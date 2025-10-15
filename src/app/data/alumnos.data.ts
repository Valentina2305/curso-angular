import { Alumno } from '../models/alumno.model';

export const ALUMNOS_DATA: Alumno[] = [
  {
    id: 1,
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@email.com',
    edad: 22,
    fechaInscripcion: new Date('2024-01-15')
  },
  {
    id: 2,
    nombre: 'María',
    apellido: 'González',
    email: 'maria.gonzalez@email.com',
    edad: 24,
    fechaInscripcion: new Date('2024-02-10')
  },
  {
    id: 3,
    nombre: 'Carlos',
    apellido: 'Rodríguez',
    email: 'carlos.rodriguez@email.com',
    edad: 21,
    fechaInscripcion: new Date('2024-01-20')
  },
  {
    id: 4,
    nombre: 'Ana',
    apellido: 'Martínez',
    email: 'ana.martinez@email.com',
    edad: 23,
    fechaInscripcion: new Date('2024-03-05')
  },
  {
    id: 5,
    nombre: 'Luis',
    apellido: 'Fernández',
    email: 'luis.fernandez@email.com',
    edad: 25,
    fechaInscripcion: new Date('2024-02-28')
  }
];
