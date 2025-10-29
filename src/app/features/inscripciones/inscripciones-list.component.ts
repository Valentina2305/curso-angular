import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { InscripcionesService } from './inscripciones.service';
import { Inscripcion } from './inscripcion.model';
import { InscripcionFormComponent } from './inscripcion-form.component';

@Component({
  selector: 'app-inscripciones-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatChipsModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Gestión de Inscripciones</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="actions">
          <button mat-raised-button color="primary" (click)="openDialog()">
            <mat-icon>add</mat-icon>
            Nueva Inscripción
          </button>
        </div>

        <table mat-table [dataSource]="inscripciones()" class="mat-elevation-z8">
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let inscripcion">{{ inscripcion.id }}</td>
          </ng-container>

          <ng-container matColumnDef="alumno">
            <th mat-header-cell *matHeaderCellDef>Alumno</th>
            <td mat-cell *matCellDef="let inscripcion">{{ inscripcion.alumnoNombre }}</td>
          </ng-container>

          <ng-container matColumnDef="curso">
            <th mat-header-cell *matHeaderCellDef>Curso</th>
            <td mat-cell *matCellDef="let inscripcion">{{ inscripcion.cursoNombre }}</td>
          </ng-container>

          <ng-container matColumnDef="fechaInscripcion">
            <th mat-header-cell *matHeaderCellDef>Fecha Inscripción</th>
            <td mat-cell *matCellDef="let inscripcion">
              {{ inscripcion.fechaInscripcion | date:'dd/MM/yyyy' }}
            </td>
          </ng-container>

          <ng-container matColumnDef="estado">
            <th mat-header-cell *matHeaderCellDef>Estado</th>
            <td mat-cell *matCellDef="let inscripcion">
              <mat-chip [ngClass]="{
                'estado-activa': inscripcion.estado === 'Activa',
                'estado-completada': inscripcion.estado === 'Completada',
                'estado-cancelada': inscripcion.estado === 'Cancelada'
              }">
                {{ inscripcion.estado }}
              </mat-chip>
            </td>
          </ng-container>

          <ng-container matColumnDef="calificacion">
            <th mat-header-cell *matHeaderCellDef>Calificación</th>
            <td mat-cell *matCellDef="let inscripcion">
              {{ inscripcion.calificacion || '-' }}
            </td>
          </ng-container>

          <ng-container matColumnDef="acciones">
            <th mat-header-cell *matHeaderCellDef>Acciones</th>
            <td mat-cell *matCellDef="let inscripcion">
              <button mat-icon-button color="primary" (click)="editInscripcion(inscripcion)">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="deleteInscripcion(inscripcion.id)">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

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

    .estado-activa {
      background-color: #4caf50;
      color: white;
    }

    .estado-completada {
      background-color: #2196f3;
      color: white;
    }

    .estado-cancelada {
      background-color: #f44336;
      color: white;
    }
  `]
})
export class InscripcionesListComponent implements OnInit {
  inscripciones = signal<Inscripcion[]>([]);
  displayedColumns: string[] = ['id', 'alumno', 'curso', 'fechaInscripcion', 'estado', 'calificacion', 'acciones'];

  constructor(
    private inscripcionesService: InscripcionesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.inscripcionesService.getInscripciones().subscribe(inscripciones => {
      this.inscripciones.set(inscripciones);
    });
  }

  openDialog(inscripcion?: Inscripcion): void {
    const dialogRef = this.dialog.open(InscripcionFormComponent, {
      width: '500px',
      data: inscripcion
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.inscripcionesService.updateInscripcion(result.id, result);
        } else {
          this.inscripcionesService.addInscripcion(result);
        }
      }
    });
  }

  editInscripcion(inscripcion: Inscripcion): void {
    this.openDialog(inscripcion);
  }

  deleteInscripcion(id: number): void {
    if (confirm('¿Está seguro de eliminar esta inscripción?')) {
      this.inscripcionesService.deleteInscripcion(id);
    }
  }
}
