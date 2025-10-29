import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CursosService } from './cursos.service';
import { Curso } from './curso.model';
import { CursoFormComponent } from './curso-form.component';

@Component({
  selector: 'app-cursos-list',
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
        <mat-card-title>Gestión de Cursos</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="actions">
          <button mat-raised-button color="primary" (click)="openDialog()">
            <mat-icon>add</mat-icon>
            Nuevo Curso
          </button>
        </div>

        <table mat-table [dataSource]="cursos()" class="mat-elevation-z8">
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let curso">{{ curso.id }}</td>
          </ng-container>

          <ng-container matColumnDef="nombre">
            <th mat-header-cell *matHeaderCellDef>Nombre</th>
            <td mat-cell *matCellDef="let curso">{{ curso.nombre }}</td>
          </ng-container>

          <ng-container matColumnDef="descripcion">
            <th mat-header-cell *matHeaderCellDef>Descripción</th>
            <td mat-cell *matCellDef="let curso">{{ curso.descripcion }}</td>
          </ng-container>

          <ng-container matColumnDef="duracionHoras">
            <th mat-header-cell *matHeaderCellDef>Duración (hs)</th>
            <td mat-cell *matCellDef="let curso">{{ curso.duracionHoras }}</td>
          </ng-container>

          <ng-container matColumnDef="cupoMaximo">
            <th mat-header-cell *matHeaderCellDef>Cupo</th>
            <td mat-cell *matCellDef="let curso">{{ curso.cupoMaximo }}</td>
          </ng-container>

          <ng-container matColumnDef="profesor">
            <th mat-header-cell *matHeaderCellDef>Profesor</th>
            <td mat-cell *matCellDef="let curso">{{ curso.profesor }}</td>
          </ng-container>

          <ng-container matColumnDef="acciones">
            <th mat-header-cell *matHeaderCellDef>Acciones</th>
            <td mat-cell *matCellDef="let curso">
              <button mat-icon-button color="primary" (click)="editCurso(curso)">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="deleteCurso(curso.id)">
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
  `]
})
export class CursosListComponent implements OnInit {
  cursos = signal<Curso[]>([]);
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'duracionHoras', 'cupoMaximo', 'profesor', 'acciones'];

  constructor(
    private cursosService: CursosService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cursosService.getCursos().subscribe(cursos => {
      this.cursos.set(cursos);
    });
  }

  openDialog(curso?: Curso): void {
    const dialogRef = this.dialog.open(CursoFormComponent, {
      width: '600px',
      data: curso
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.cursosService.updateCurso(result.id, result);
        } else {
          this.cursosService.addCurso(result);
        }
      }
    });
  }

  editCurso(curso: Curso): void {
    this.openDialog(curso);
  }

  deleteCurso(id: number): void {
    if (confirm('¿Está seguro de eliminar este curso?')) {
      this.cursosService.deleteCurso(id);
    }
  }
}
