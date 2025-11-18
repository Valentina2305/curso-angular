import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { User, UserRole } from '../../core/models/user.model';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  template: `
    <h2 mat-dialog-title>{{ isEditMode ? 'Editar Usuario' : 'Nuevo Usuario' }}</h2>

    <mat-dialog-content>
      <form>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Usuario</mat-label>
          <input matInput [(ngModel)]="usuario.username" name="username" required />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Contraseña</mat-label>
          <input matInput type="password" [(ngModel)]="usuario.password" name="password" required />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nombre</mat-label>
          <input matInput [(ngModel)]="usuario.nombre" name="nombre" required />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email</mat-label>
          <input matInput type="email" [(ngModel)]="usuario.email" name="email" required />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Rol</mat-label>
          <mat-select [(ngModel)]="usuario.role" name="role" required>
            <mat-option [value]="UserRole.ADMIN">Administrador</mat-option>
            <mat-option [value]="UserRole.USER">Usuario</mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!isValid()">
        {{ isEditMode ? 'Guardar' : 'Crear' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      min-width: 400px;
      padding: 20px 0;
    }

    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }

    mat-dialog-actions {
      padding: 15px 0;
    }
  `]
})
export class UsuarioFormComponent {
  usuario: User;
  isEditMode: boolean;
  UserRole = UserRole;

  constructor(
    public dialogRef: MatDialogRef<UsuarioFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User | null
  ) {
    this.isEditMode = !!data;
    this.usuario = data ? { ...data } : {
      id: 0,
      username: '',
      password: '',
      nombre: '',
      email: '',
      role: UserRole.USER
    };
  }

  isValid(): boolean {
    return !!(
      this.usuario.username &&
      this.usuario.password &&
      this.usuario.nombre &&
      this.usuario.email &&
      this.usuario.role
    );
  }

  onSave(): void {
    if (this.isValid()) {
      this.dialogRef.close(this.usuario);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
