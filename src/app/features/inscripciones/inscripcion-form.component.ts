import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Inscripcion } from './inscripcion.model';
import { AlumnosService } from '../alumnos/alumnos.service';
import { CursosService } from '../cursos/cursos.service';
import { Alumno } from '../alumnos/alumno.model';
import { Curso } from '../cursos/curso.model';

@Component({
  selector: 'app-inscripcion-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Editar' : 'Nueva' }} Inscripción</h2>
    <mat-dialog-content>
      <form [formGroup]="inscripcionForm">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Alumno</mat-label>
          <mat-select formControlName="alumnoId" required>
            @for (alumno of alumnos(); track alumno.id) {
              <mat-option [value]="alumno.id">
                {{ alumno.nombre }} {{ alumno.apellido }}
              </mat-option>
            }
          </mat-select>
          <mat-error *ngIf="inscripcionForm.get('alumnoId')?.hasError('required')">
            Debe seleccionar un alumno
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Curso</mat-label>
          <mat-select formControlName="cursoId" required>
            @for (curso of cursos(); track curso.id) {
              <mat-option [value]="curso.id">
                {{ curso.nombre }}
              </mat-option>
            }
          </mat-select>
          <mat-error *ngIf="inscripcionForm.get('cursoId')?.hasError('required')">
            Debe seleccionar un curso
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Fecha de Inscripción</mat-label>
          <input matInput [matDatepicker]="picker" formControlName="fechaInscripcion" required>
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          <mat-error *ngIf="inscripcionForm.get('fechaInscripcion')?.hasError('required')">
            La fecha de inscripción es requerida
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Estado</mat-label>
          <mat-select formControlName="estado" required>
            <mat-option value="Activa">Activa</mat-option>
            <mat-option value="Completada">Completada</mat-option>
            <mat-option value="Cancelada">Cancelada</mat-option>
          </mat-select>
          <mat-error *ngIf="inscripcionForm.get('estado')?.hasError('required')">
            El estado es requerido
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Calificación</mat-label>
          <input matInput type="number" formControlName="calificacion" min="0" max="10">
          <mat-error *ngIf="inscripcionForm.get('calificacion')?.hasError('min')">
            La calificación mínima es 0
          </mat-error>
          <mat-error *ngIf="inscripcionForm.get('calificacion')?.hasError('max')">
            La calificación máxima es 10
          </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!inscripcionForm.valid">
        Guardar
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }

    mat-dialog-content {
      min-width: 400px;
      padding-top: 20px;
    }
  `]
})
export class InscripcionFormComponent implements OnInit {
  inscripcionForm: FormGroup;
  alumnos = signal<Alumno[]>([]);
  cursos = signal<Curso[]>([]);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<InscripcionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inscripcion | null,
    private alumnosService: AlumnosService,
    private cursosService: CursosService
  ) {
    this.inscripcionForm = this.fb.group({
      alumnoId: ['', Validators.required],
      cursoId: ['', Validators.required],
      fechaInscripcion: ['', Validators.required],
      estado: ['Activa', Validators.required],
      calificacion: ['', [Validators.min(0), Validators.max(10)]]
    });
  }

  ngOnInit(): void {
    this.alumnosService.getAlumnos().subscribe(alumnos => {
      this.alumnos.set(alumnos);
    });

    this.cursosService.getCursos().subscribe(cursos => {
      this.cursos.set(cursos);
    });

    if (this.data) {
      this.inscripcionForm.patchValue(this.data);
    }
  }

  onSave(): void {
    if (this.inscripcionForm.valid) {
      const result = this.data
        ? { ...this.data, ...this.inscripcionForm.value }
        : this.inscripcionForm.value;
      this.dialogRef.close(result);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
