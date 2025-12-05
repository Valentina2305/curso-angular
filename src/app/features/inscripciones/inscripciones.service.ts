import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, map } from 'rxjs';
import { Inscripcion } from './inscripcion.model';
import { AlumnosService } from '../alumnos/alumnos.service';
import { CursosService } from '../cursos/cursos.service';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  private apiUrl = 'http://localhost:3000/inscripciones';

  constructor(
    private http: HttpClient,
    private alumnosService: AlumnosService,
    private cursosService: CursosService
  ) {}

  getInscripciones(): Observable<Inscripcion[]> {
    return combineLatest([
      this.http.get<Inscripcion[]>(this.apiUrl),
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

  getInscripcionById(id: number): Observable<Inscripcion> {
    return this.http.get<Inscripcion>(`${this.apiUrl}/${id}`);
  }

  addInscripcion(inscripcion: Omit<Inscripcion, 'id'>): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(this.apiUrl, inscripcion);
  }

  updateInscripcion(id: number, inscripcion: Partial<Inscripcion>): Observable<Inscripcion> {
    return this.http.put<Inscripcion>(`${this.apiUrl}/${id}`, inscripcion);
  }

  deleteInscripcion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
