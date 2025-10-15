import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Inscripcion } from '../models/inscripcion.model';
import { INSCRIPCIONES_DATA } from '../data/inscripciones.data';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  private inscripcionesSubject = new BehaviorSubject<Inscripcion[]>(INSCRIPCIONES_DATA);
  public inscripciones$: Observable<Inscripcion[]> = this.inscripcionesSubject.asObservable();

  constructor() { }

  getInscripciones(): Inscripcion[] {
    return this.inscripcionesSubject.value;
  }

  getInscripcionById(id: number): Inscripcion | undefined {
    return this.inscripcionesSubject.value.find(inscripcion => inscripcion.id === id);
  }

  getInscripcionesByAlumno(alumnoId: number): Inscripcion[] {
    return this.inscripcionesSubject.value.filter(i => i.alumnoId === alumnoId);
  }

  getInscripcionesByCurso(cursoId: number): Inscripcion[] {
    return this.inscripcionesSubject.value.filter(i => i.cursoId === cursoId);
  }

  addInscripcion(inscripcion: Inscripcion): void {
    const inscripciones = this.inscripcionesSubject.value;
    const newId = Math.max(...inscripciones.map(i => i.id), 0) + 1;
    const newInscripcion = { ...inscripcion, id: newId };
    this.inscripcionesSubject.next([...inscripciones, newInscripcion]);
  }

  updateInscripcion(inscripcion: Inscripcion): void {
    const inscripciones = this.inscripcionesSubject.value;
    const index = inscripciones.findIndex(i => i.id === inscripcion.id);
    if (index !== -1) {
      inscripciones[index] = inscripcion;
      this.inscripcionesSubject.next([...inscripciones]);
    }
  }

  deleteInscripcion(id: number): void {
    const inscripciones = this.inscripcionesSubject.value.filter(i => i.id !== id);
    this.inscripcionesSubject.next(inscripciones);
  }
}
