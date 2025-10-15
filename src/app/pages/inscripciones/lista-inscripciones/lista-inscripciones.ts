import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { InscripcionesService } from '../../../services/inscripciones.service';
import { AlumnosService } from '../../../services/alumnos.service';
import { CursosService } from '../../../services/cursos.service';
import { Inscripcion } from '../../../models/inscripcion.model';

interface InscripcionDisplay extends Inscripcion {
  alumnoNombre?: string;
  cursoNombre?: string;
}

@Component({
  selector: 'app-lista-inscripciones',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './lista-inscripciones.html',
  styleUrl: './lista-inscripciones.css'
})
export class ListaInscripciones implements OnInit {
  displayedColumns: string[] = ['id', 'alumno', 'curso', 'fechaInscripcion', 'estado', 'acciones'];
  dataSource: InscripcionDisplay[] = [];

  constructor(
    private inscripcionesService: InscripcionesService,
    private alumnosService: AlumnosService,
    private cursosService: CursosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inscripcionesService.inscripciones$.subscribe(inscripciones => {
      this.dataSource = inscripciones.map(insc => {
        const alumno = this.alumnosService.getAlumnoById(insc.alumnoId);
        const curso = this.cursosService.getCursoById(insc.cursoId);
        return {
          ...insc,
          alumnoNombre: alumno ? `${alumno.nombre} ${alumno.apellido}` : 'Desconocido',
          cursoNombre: curso ? curso.nombre : 'Desconocido'
        };
      });
    });
  }

  agregarInscripcion(): void {
    this.router.navigate(['/inscripciones/nuevo']);
  }

  editarInscripcion(id: number): void {
    this.router.navigate(['/inscripciones/editar', id]);
  }

  eliminarInscripcion(id: number): void {
    if (confirm('¿Está seguro de eliminar esta inscripción?')) {
      this.inscripcionesService.deleteInscripcion(id);
    }
  }
}
