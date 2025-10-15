import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { InscripcionesService } from '../../../services/inscripciones.service';
import { AlumnosService } from '../../../services/alumnos.service';
import { CursosService } from '../../../services/cursos.service';
import { Inscripcion } from '../../../models/inscripcion.model';
import { Alumno } from '../../../models/alumno.model';
import { Curso } from '../../../models/curso.model';

@Component({
  selector: 'app-abm-inscripciones',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './abm-inscripciones.html',
  styleUrl: './abm-inscripciones.css'
})
export class AbmInscripciones implements OnInit {
  inscripcionForm: FormGroup;
  isEditMode: boolean = false;
  inscripcionId?: number;
  alumnos: Alumno[] = [];
  cursos: Curso[] = [];
  estados = ['activa', 'completada', 'cancelada'];

  constructor(
    private fb: FormBuilder,
    private inscripcionesService: InscripcionesService,
    private alumnosService: AlumnosService,
    private cursosService: CursosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.inscripcionForm = this.fb.group({
      alumnoId: ['', Validators.required],
      cursoId: ['', Validators.required],
      fechaInscripcion: [new Date(), Validators.required],
      estado: ['activa', Validators.required]
    });
  }

  ngOnInit(): void {
    this.alumnos = this.alumnosService.getAlumnos();
    this.cursos = this.cursosService.getCursos();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.inscripcionId = +params['id'];
        this.cargarInscripcion(this.inscripcionId);
      }
    });
  }

  cargarInscripcion(id: number): void {
    const inscripcion = this.inscripcionesService.getInscripcionById(id);
    if (inscripcion) {
      this.inscripcionForm.patchValue({
        alumnoId: inscripcion.alumnoId,
        cursoId: inscripcion.cursoId,
        fechaInscripcion: inscripcion.fechaInscripcion,
        estado: inscripcion.estado
      });
    }
  }

  onSubmit(): void {
    if (this.inscripcionForm.valid) {
      const inscripcionData: Inscripcion = {
        id: this.inscripcionId || 0,
        ...this.inscripcionForm.value
      };

      if (this.isEditMode) {
        this.inscripcionesService.updateInscripcion(inscripcionData);
      } else {
        this.inscripcionesService.addInscripcion(inscripcionData);
      }

      this.router.navigate(['/inscripciones']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/inscripciones']);
  }

  getErrorMessage(field: string): string {
    const control = this.inscripcionForm.get(field);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    return '';
  }
}
