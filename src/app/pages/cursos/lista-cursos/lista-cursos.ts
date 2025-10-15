import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CursosService } from '../../../services/cursos.service';
import { Curso } from '../../../models/curso.model';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-lista-cursos',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './lista-cursos.html',
  styleUrl: './lista-cursos.css'
})
export class ListaCursos implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'duracion', 'instructor', 'fechaInicio', 'fechaFin', 'acciones'];
  dataSource: Curso[] = [];
  isAdmin: boolean = false;

  constructor(
    private cursosService: CursosService,
    private rolService: RolService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rolService.rol$.subscribe(() => {
      this.isAdmin = this.rolService.isAdmin();
    });
    this.cursosService.cursos$.subscribe(cursos => {
      this.dataSource = cursos;
    });
  }

  agregarCurso(): void {
    this.router.navigate(['/cursos/nuevo']);
  }

  editarCurso(id: number): void {
    this.router.navigate(['/cursos/editar', id]);
  }

  eliminarCurso(id: number): void {
    if (confirm('¿Está seguro de eliminar este curso?')) {
      this.cursosService.deleteCurso(id);
    }
  }
}
