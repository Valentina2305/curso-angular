import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>school</mat-icon>
            <span>Gestión de Cursos</span>
          </mat-card-title>
          <mat-card-subtitle>Iniciar Sesión</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <form (ngSubmit)="onLogin()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Usuario</mat-label>
              <input
                matInput
                type="text"
                [(ngModel)]="username"
                name="username"
                required
                autocomplete="username"
              />
              <mat-icon matPrefix>person</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Contraseña</mat-label>
              <input
                matInput
                [type]="hidePassword() ? 'password' : 'text'"
                [(ngModel)]="password"
                name="password"
                required
                autocomplete="current-password"
              />
              <mat-icon matPrefix>lock</mat-icon>
              <button
                mat-icon-button
                matSuffix
                type="button"
                (click)="hidePassword.set(!hidePassword())"
              >
                <mat-icon>{{ hidePassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
            </mat-form-field>

            @if (errorMessage()) {
              <div class="error-message">
                <mat-icon>error</mat-icon>
                {{ errorMessage() }}
              </div>
            }

            <button mat-raised-button color="primary" type="submit" class="full-width">
              Ingresar
            </button>
          </form>

          <div class="help-text">
            <p><strong>Usuarios de prueba:</strong></p>
            <p>Admin: usuario: admin / contraseña: admin123</p>
            <p>Usuario: usuario: usuario / contraseña: user123</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .login-card {
      width: 100%;
      max-width: 400px;
      margin: 20px;
    }

    mat-card-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 0;
    }

    mat-card-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 24px;
      margin-bottom: 10px;
    }

    mat-card-title mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
    }

    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }

    form {
      padding: 20px 0;
    }

    .error-message {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #f44336;
      background-color: #ffebee;
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 15px;
      font-size: 14px;
    }

    .error-message mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .help-text {
      margin-top: 20px;
      padding: 15px;
      background-color: #f5f5f5;
      border-radius: 4px;
      font-size: 12px;
      color: #666;
    }

    .help-text p {
      margin: 5px 0;
    }

    .help-text strong {
      color: #333;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  hidePassword = signal(true);
  errorMessage = signal('');

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    this.errorMessage.set('');

    if (!this.username || !this.password) {
      this.errorMessage.set('Por favor complete todos los campos');
      return;
    }

    const success = this.authService.login(this.username, this.password);

    if (success) {
      this.router.navigate(['/']);
    } else {
      this.errorMessage.set('Usuario o contraseña incorrectos');
    }
  }
}
