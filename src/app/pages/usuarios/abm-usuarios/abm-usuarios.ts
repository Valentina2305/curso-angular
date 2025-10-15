import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-abm-usuarios',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './abm-usuarios.html',
  styleUrl: './abm-usuarios.css'
})
export class AbmUsuarios implements OnInit {
  usuarioForm: FormGroup;
  isEditMode: boolean = false;
  usuarioId?: number;
  roles = ['administrador', 'usuario'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.usuarioForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      rol: ['usuario', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.usuarioId = +params['id'];
        this.cargarUsuario(this.usuarioId);
      }
    });
  }

  cargarUsuario(id: number): void {
    const usuario = this.authService.getUsuarioById(id);
    if (usuario) {
      this.usuarioForm.patchValue({
        username: usuario.username,
        password: usuario.password,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      });
    }
  }

  onSubmit(): void {
    if (this.usuarioForm.valid) {
      const usuarioData: Usuario = {
        id: this.usuarioId || 0,
        ...this.usuarioForm.value
      };

      if (this.isEditMode) {
        this.authService.updateUsuario(usuarioData);
      } else {
        this.authService.addUsuario(usuarioData);
      }

      this.router.navigate(['/usuarios']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/usuarios']);
  }

  getErrorMessage(field: string): string {
    const control = this.usuarioForm.get(field);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('email')) {
      return 'Email inválido';
    }
    if (control?.hasError('minlength')) {
      return `Mínimo ${control.errors?.['minlength'].requiredLength} caracteres`;
    }
    return '';
  }
}
