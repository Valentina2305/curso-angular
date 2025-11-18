import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { AlumnosService } from './alumnos.service';
import { Alumno } from './alumno.model';
import { AlumnoFormComponent } from './alumno-form.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-alumnos-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Gestión de Alumnos</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        @if (authService.isAdmin()) {
          <div class="actions">
            <button mat-raised-button color="primary" (click)="openDialog()">
              <mat-icon>add</mat-icon>
              Nuevo Alumno
            </button>
          </div>
        }

        <table mat-table [dataSource]="alumnos()" class="mat-elevation-z8">
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let alumno">{{ alumno.id }}</td>
          </ng-container>

          <ng-container matColumnDef="nombre">
            <th mat-header-cell *matHeaderCellDef>Nombre</th>
            <td mat-cell *matCellDef="let alumno">{{ alumno.nombre }}</td>
          </ng-container>

          <ng-container matColumnDef="apellido">
            <th mat-header-cell *matHeaderCellDef>Apellido</th>
            <td mat-cell *matCellDef="let alumno">{{ alumno.apellido }}</td>
          </ng-container>

          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef>Email</th>
            <td mat-cell *matCellDef="let alumno">{{ alumno.email }}</td>
          </ng-container>

          <ng-container matColumnDef="dni">
            <th mat-header-cell *matHeaderCellDef>DNI</th>
            <td mat-cell *matCellDef="let alumno">{{ alumno.dni }}</td>
          </ng-container>

          <ng-container matColumnDef="telefono">
            <th mat-header-cell *matHeaderCellDef>Teléfono</th>
            <td mat-cell *matCellDef="let alumno">{{ alumno.telefono }}</td>
          </ng-container>

          @if (authService.isAdmin()) {
            <ng-container matColumnDef="acciones">
              <th mat-header-cell *matHeaderCellDef>Acciones</th>
              <td mat-cell *matCellDef="let alumno">
                <button mat-icon-button color="primary" (click)="editAlumno(alumno)">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="deleteAlumno(alumno.id)">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>
          }

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card {
      margin: 20px;
    }

    .actions {
      margin-bottom: 20px;
    }

    table {
      width: 100%;
    }

    mat-card-title {
      font-size: 24px;
      margin-bottom: 10px;
    }
  `]
})
export class AlumnosListComponent implements OnInit {
  alumnos = signal<Alumno[]>([]);
  displayedColumns: string[] = [];

  constructor(
    private alumnosService: AlumnosService,
    private dialog: MatDialog,
    protected authService: AuthService
  ) {
    this.displayedColumns = this.authService.isAdmin()
      ? ['id', 'nombre', 'apellido', 'email', 'dni', 'telefono', 'acciones']
      : ['id', 'nombre', 'apellido', 'email', 'dni', 'telefono'];
  }

  ngOnInit(): void {
    this.alumnosService.getAlumnos().subscribe(alumnos => {
      this.alumnos.set(alumnos);
    });
  }

  openDialog(alumno?: Alumno): void {
    const dialogRef = this.dialog.open(AlumnoFormComponent, {
      width: '500px',
      data: alumno
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.alumnosService.updateAlumno(result.id, result);
        } else {
          this.alumnosService.addAlumno(result);
        }
      }
    });
  }

  editAlumno(alumno: Alumno): void {
    this.openDialog(alumno);
  }

  deleteAlumno(id: number): void {
    if (confirm('¿Está seguro de eliminar este alumno?')) {
      this.alumnosService.deleteAlumno(id);
    }
  }
}
