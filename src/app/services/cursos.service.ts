import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Curso } from '../models/curso.model';
import { CURSOS_DATA } from '../data/cursos.data';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private cursosSubject = new BehaviorSubject<Curso[]>(CURSOS_DATA);
  public cursos$: Observable<Curso[]> = this.cursosSubject.asObservable();

  constructor() { }

  getCursos(): Curso[] {
    return this.cursosSubject.value;
  }

  getCursoById(id: number): Curso | undefined {
    return this.cursosSubject.value.find(curso => curso.id === id);
  }

  addCurso(curso: Curso): void {
    const cursos = this.cursosSubject.value;
    const newId = Math.max(...cursos.map(c => c.id), 0) + 1;
    const newCurso = { ...curso, id: newId };
    this.cursosSubject.next([...cursos, newCurso]);
  }

  updateCurso(curso: Curso): void {
    const cursos = this.cursosSubject.value;
    const index = cursos.findIndex(c => c.id === curso.id);
    if (index !== -1) {
      cursos[index] = curso;
      this.cursosSubject.next([...cursos]);
    }
  }

  deleteCurso(id: number): void {
    const cursos = this.cursosSubject.value.filter(c => c.id !== id);
    this.cursosSubject.next(cursos);
  }
}
