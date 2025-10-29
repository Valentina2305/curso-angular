import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Curso } from './curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private cursos: Curso[] = [
    {
      id: 1,
      nombre: 'Angular Avanzado',
      descripcion: 'Curso completo de Angular para desarrolladores',
      duracionHoras: 40,
      fechaInicio: new Date('2024-01-15'),
      fechaFin: new Date('2024-03-15'),
      cupoMaximo: 30,
      profesor: 'Dr. Roberto Martinez'
    },
    {
      id: 2,
      nombre: 'TypeScript Fundamentals',
      descripcion: 'Fundamentos de TypeScript desde cero',
      duracionHoras: 25,
      fechaInicio: new Date('2024-02-01'),
      fechaFin: new Date('2024-03-01'),
      cupoMaximo: 25,
      profesor: 'Ing. Laura Fernández'
    },
    {
      id: 3,
      nombre: 'Desarrollo Web Full Stack',
      descripcion: 'Curso integral de desarrollo web',
      duracionHoras: 60,
      fechaInicio: new Date('2024-03-01'),
      fechaFin: new Date('2024-06-01'),
      cupoMaximo: 20,
      profesor: 'Lic. Miguel Ángel Torres'
    }
  ];

  private cursosSubject = new BehaviorSubject<Curso[]>(this.cursos);
  public cursos$ = this.cursosSubject.asObservable();

  constructor() {}

  getCursos(): Observable<Curso[]> {
    return this.cursos$;
  }

  getCursoById(id: number): Curso | undefined {
    return this.cursos.find(curso => curso.id === id);
  }

  addCurso(curso: Omit<Curso, 'id'>): void {
    const newId = this.cursos.length > 0
      ? Math.max(...this.cursos.map(c => c.id)) + 1
      : 1;
    const newCurso = { ...curso, id: newId };
    this.cursos = [...this.cursos, newCurso];
    this.cursosSubject.next(this.cursos);
  }

  updateCurso(id: number, curso: Partial<Curso>): void {
    const index = this.cursos.findIndex(c => c.id === id);
    if (index !== -1) {
      this.cursos[index] = { ...this.cursos[index], ...curso };
      this.cursosSubject.next([...this.cursos]);
    }
  }

  deleteCurso(id: number): void {
    this.cursos = this.cursos.filter(curso => curso.id !== id);
    this.cursosSubject.next(this.cursos);
  }
}
