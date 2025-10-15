import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alumno } from '../models/alumno.model';
import { ALUMNOS_DATA } from '../data/alumnos.data';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private alumnosSubject = new BehaviorSubject<Alumno[]>(ALUMNOS_DATA);
  public alumnos$: Observable<Alumno[]> = this.alumnosSubject.asObservable();

  constructor() { }

  getAlumnos(): Alumno[] {
    return this.alumnosSubject.value;
  }

  getAlumnoById(id: number): Alumno | undefined {
    return this.alumnosSubject.value.find(alumno => alumno.id === id);
  }

  addAlumno(alumno: Alumno): void {
    const alumnos = this.alumnosSubject.value;
    const newId = Math.max(...alumnos.map(a => a.id), 0) + 1;
    const newAlumno = { ...alumno, id: newId };
    this.alumnosSubject.next([...alumnos, newAlumno]);
  }

  updateAlumno(alumno: Alumno): void {
    const alumnos = this.alumnosSubject.value;
    const index = alumnos.findIndex(a => a.id === alumno.id);
    if (index !== -1) {
      alumnos[index] = alumno;
      this.alumnosSubject.next([...alumnos]);
    }
  }

  deleteAlumno(id: number): void {
    const alumnos = this.alumnosSubject.value.filter(a => a.id !== id);
    this.alumnosSubject.next(alumnos);
  }
}
