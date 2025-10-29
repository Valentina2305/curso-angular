import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Curso } from './curso.model';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Editar' : 'Nuevo' }} Curso</h2>
    <mat-dialog-content>
      <form [formGroup]="cursoForm">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nombre</mat-label>
          <input matInput formControlName="nombre" required>
          <mat-error *ngIf="cursoForm.get('nombre')?.hasError('required')">
            El nombre es requerido
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Descripción</mat-label>
          <textarea matInput formControlName="descripcion" rows="3" required></textarea>
          <mat-error *ngIf="cursoForm.get('descripcion')?.hasError('required')">
            La descripción es requerida
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Duración (horas)</mat-label>
          <input matInput type="number" formControlName="duracionHoras" required>
          <mat-error *ngIf="cursoForm.get('duracionHoras')?.hasError('required')">
            La duración es requerida
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Cupo Máximo</mat-label>
          <input matInput type="number" formControlName="cupoMaximo" required>
          <mat-error *ngIf="cursoForm.get('cupoMaximo')?.hasError('required')">
            El cupo máximo es requerido
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Profesor</mat-label>
          <input matInput formControlName="profesor" required>
          <mat-error *ngIf="cursoForm.get('profesor')?.hasError('required')">
            El profesor es requerido
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Fecha de Inicio</mat-label>
          <input matInput [matDatepicker]="pickerInicio" formControlName="fechaInicio" required>
          <mat-datepicker-toggle matSuffix [for]="pickerInicio"></mat-datepicker-toggle>
          <mat-datepicker #pickerInicio></mat-datepicker>
          <mat-error *ngIf="cursoForm.get('fechaInicio')?.hasError('required')">
            La fecha de inicio es requerida
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Fecha de Fin</mat-label>
          <input matInput [matDatepicker]="pickerFin" formControlName="fechaFin" required>
          <mat-datepicker-toggle matSuffix [for]="pickerFin"></mat-datepicker-toggle>
          <mat-datepicker #pickerFin></mat-datepicker>
          <mat-error *ngIf="cursoForm.get('fechaFin')?.hasError('required')">
            La fecha de fin es requerida
          </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!cursoForm.valid">
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
      min-width: 500px;
      padding-top: 20px;
    }
  `]
})
export class CursoFormComponent implements OnInit {
  cursoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CursoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Curso | null
  ) {
    this.cursoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      duracionHoras: ['', [Validators.required, Validators.min(1)]],
      cupoMaximo: ['', [Validators.required, Validators.min(1)]],
      profesor: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.cursoForm.patchValue(this.data);
    }
  }

  onSave(): void {
    if (this.cursoForm.valid) {
      const result = this.data
        ? { ...this.data, ...this.cursoForm.value }
        : this.cursoForm.value;
      this.dialogRef.close(result);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
