import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alumno } from './alumno.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private alumnos: Alumno[] = [
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan.perez@example.com',
      fechaNacimiento: new Date('1998-05-15'),
      telefono: '1234567890',
      dni: '12345678'
    },
    {
      id: 2,
      nombre: 'María',
      apellido: 'González',
      email: 'maria.gonzalez@example.com',
      fechaNacimiento: new Date('1999-08-20'),
      telefono: '0987654321',
      dni: '87654321'
    },
    {
      id: 3,
      nombre: 'Carlos',
      apellido: 'Rodríguez',
      email: 'carlos.rodriguez@example.com',
      fechaNacimiento: new Date('2000-03-10'),
      telefono: '1122334455',
      dni: '11223344'
    }
  ];

  private alumnosSubject = new BehaviorSubject<Alumno[]>(this.alumnos);
  public alumnos$ = this.alumnosSubject.asObservable();

  constructor() {}

  getAlumnos(): Observable<Alumno[]> {
    return this.alumnos$;
  }

  getAlumnoById(id: number): Alumno | undefined {
    return this.alumnos.find(alumno => alumno.id === id);
  }

  addAlumno(alumno: Omit<Alumno, 'id'>): void {
    const newId = this.alumnos.length > 0
      ? Math.max(...this.alumnos.map(a => a.id)) + 1
      : 1;
    const newAlumno = { ...alumno, id: newId };
    this.alumnos = [...this.alumnos, newAlumno];
    this.alumnosSubject.next(this.alumnos);
  }

  updateAlumno(id: number, alumno: Partial<Alumno>): void {
    const index = this.alumnos.findIndex(a => a.id === id);
    if (index !== -1) {
      this.alumnos[index] = { ...this.alumnos[index], ...alumno };
      this.alumnosSubject.next([...this.alumnos]);
    }
  }

  deleteAlumno(id: number): void {
    this.alumnos = this.alumnos.filter(alumno => alumno.id !== id);
    this.alumnosSubject.next(this.alumnos);
  }
}
