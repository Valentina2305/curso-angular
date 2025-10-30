import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AlumnosService } from '../../../services/alumnos.service';
import { Alumno } from '../../../models/alumno.model';

@Component({
  selector: 'app-abm-alumnos',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './abm-alumnos.html',
  styleUrl: './abm-alumnos.css'
})
export class AbmAlumnos implements OnInit {
  alumnoForm: FormGroup;
  isEditMode: boolean = false;
  alumnoId?: number;

  constructor(
    private fb: FormBuilder,
    private alumnosService: AlumnosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.alumnoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      fechaInscripcion: [new Date(), Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.alumnoId = +params['id'];
        this.cargarAlumno(this.alumnoId);
      }
    });
  }

  cargarAlumno(id: number): void {
    const alumno = this.alumnosService.getAlumnoById(id);
    if (alumno) {
      this.alumnoForm.patchValue({
        nombre: alumno.nombre,
        apellido: alumno.apellido,
        email: alumno.email,
        edad: alumno.edad,
        fechaInscripcion: alumno.fechaInscripcion
      });
    }
  }

  onSubmit(): void {
    if (this.alumnoForm.valid) {
      const alumnoData: Alumno = {
        id: this.alumnoId || 0,
        ...this.alumnoForm.value
      };

      if (this.isEditMode) {
        this.alumnosService.updateAlumno(alumnoData);
      } else {
        this.alumnosService.addAlumno(alumnoData);
      }

      this.router.navigate(['/alumnos']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/alumnos']);
  }

  getErrorMessage(field: string): string {
    const control = this.alumnoForm.get(field);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('email')) {
      return 'Email inválido';
    }
    if (control?.hasError('minlength')) {
      return `Mínimo ${control.errors?.['minlength'].requiredLength} caracteres`;
    }
    if (control?.hasError('min')) {
      return `Valor mínimo: ${control.errors?.['min'].min}`;
    }
    if (control?.hasError('max')) {
      return `Valor máximo: ${control.errors?.['max'].max}`;
    }
    return '';
  }
}
