import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AlumnosService } from '../../../services/alumnos.service';
import { Alumno } from '../../../models/alumno.model';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-lista-alumnos',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './lista-alumnos.html',
  styleUrl: './lista-alumnos.css'
})
export class ListaAlumnos implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'email', 'edad', 'fechaInscripcion', 'acciones'];
  dataSource: Alumno[] = [];
  isAdmin: boolean = false;

  constructor(
    private alumnosService: AlumnosService,
    private rolService: RolService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rolService.rol$.subscribe(() => {
      this.isAdmin = this.rolService.isAdmin();
    });
    this.alumnosService.alumnos$.subscribe(alumnos => {
      this.dataSource = alumnos;
    });
  }

  agregarAlumno(): void {
    this.router.navigate(['/alumnos/nuevo']);
  }

  editarAlumno(id: number): void {
    this.router.navigate(['/alumnos/editar', id]);
  }

  eliminarAlumno(id: number): void {
    if (confirm('¿Está seguro de eliminar este alumno?')) {
      this.alumnosService.deleteAlumno(id);
    }
  }
}
