import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { Inscripcion } from './inscripcion.model';
import { AlumnosService } from '../alumnos/alumnos.service';
import { CursosService } from '../cursos/cursos.service';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  private inscripciones: Inscripcion[] = [
    {
      id: 1,
      alumnoId: 1,
      cursoId: 1,
      fechaInscripcion: new Date('2024-01-10'),
      estado: 'Activa'
    },
    {
      id: 2,
      alumnoId: 2,
      cursoId: 1,
      fechaInscripcion: new Date('2024-01-12'),
      estado: 'Activa'
    },
    {
      id: 3,
      alumnoId: 1,
      cursoId: 2,
      fechaInscripcion: new Date('2024-01-25'),
      estado: 'Completada',
      calificacion: 9
    },
    {
      id: 4,
      alumnoId: 3,
      cursoId: 3,
      fechaInscripcion: new Date('2024-02-28'),
      estado: 'Activa'
    }
  ];

  private inscripcionesSubject = new BehaviorSubject<Inscripcion[]>(this.inscripciones);

  constructor(
    private alumnosService: AlumnosService,
    private cursosService: CursosService
  ) {}

  getInscripciones(): Observable<Inscripcion[]> {
    return combineLatest([
      this.inscripcionesSubject.asObservable(),
      this.alumnosService.getAlumnos(),
      this.cursosService.getCursos()
    ]).pipe(
      map(([inscripciones, alumnos, cursos]) => {
        return inscripciones.map(inscripcion => {
          const alumno = alumnos.find(a => a.id === inscripcion.alumnoId);
          const curso = cursos.find(c => c.id === inscripcion.cursoId);
          return {
            ...inscripcion,
            alumnoNombre: alumno ? `${alumno.nombre} ${alumno.apellido}` : 'Desconocido',
            cursoNombre: curso ? curso.nombre : 'Desconocido'
          };
        });
      })
    );
  }

  getInscripcionById(id: number): Inscripcion | undefined {
    return this.inscripciones.find(inscripcion => inscripcion.id === id);
  }

  addInscripcion(inscripcion: Omit<Inscripcion, 'id'>): void {
    const newId = this.inscripciones.length > 0
      ? Math.max(...this.inscripciones.map(i => i.id)) + 1
      : 1;
    const newInscripcion = { ...inscripcion, id: newId };
    this.inscripciones = [...this.inscripciones, newInscripcion];
    this.inscripcionesSubject.next(this.inscripciones);
  }

  updateInscripcion(id: number, inscripcion: Partial<Inscripcion>): void {
    const index = this.inscripciones.findIndex(i => i.id === id);
    if (index !== -1) {
      this.inscripciones[index] = { ...this.inscripciones[index], ...inscripcion };
      this.inscripcionesSubject.next([...this.inscripciones]);
    }
  }

  deleteInscripcion(id: number): void {
    this.inscripciones = this.inscripciones.filter(inscripcion => inscripcion.id !== id);
    this.inscripcionesSubject.next(this.inscripciones);
  }
}
