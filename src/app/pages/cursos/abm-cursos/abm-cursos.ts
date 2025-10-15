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
import { CursosService } from '../../../services/cursos.service';
import { Curso } from '../../../models/curso.model';

@Component({
  selector: 'app-abm-cursos',
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
  templateUrl: './abm-cursos.html',
  styleUrl: './abm-cursos.css'
})
export class AbmCursos implements OnInit {
  cursoForm: FormGroup;
  isEditMode: boolean = false;
  cursoId?: number;

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.cursoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      duracion: ['', [Validators.required, Validators.min(1)]],
      instructor: ['', [Validators.required, Validators.minLength(3)]],
      fechaInicio: [new Date(), Validators.required],
      fechaFin: [new Date(), Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.cursoId = +params['id'];
        this.cargarCurso(this.cursoId);
      }
    });
  }

  cargarCurso(id: number): void {
    const curso = this.cursosService.getCursoById(id);
    if (curso) {
      this.cursoForm.patchValue({
        nombre: curso.nombre,
        descripcion: curso.descripcion,
        duracion: curso.duracion,
        instructor: curso.instructor,
        fechaInicio: curso.fechaInicio,
        fechaFin: curso.fechaFin
      });
    }
  }

  onSubmit(): void {
    if (this.cursoForm.valid) {
      const cursoData: Curso = {
        id: this.cursoId || 0,
        ...this.cursoForm.value
      };

      if (this.isEditMode) {
        this.cursosService.updateCurso(cursoData);
      } else {
        this.cursosService.addCurso(cursoData);
      }

      this.router.navigate(['/cursos']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/cursos']);
  }

  getErrorMessage(field: string): string {
    const control = this.cursoForm.get(field);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('minlength')) {
      return `Mínimo ${control.errors?.['minlength'].requiredLength} caracteres`;
    }
    if (control?.hasError('min')) {
      return `Valor mínimo: ${control.errors?.['min'].min}`;
    }
    return '';
  }
}
