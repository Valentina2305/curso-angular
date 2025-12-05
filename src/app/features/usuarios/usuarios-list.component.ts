import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../core/services/auth.service';
import { User, UserRole } from '../../core/models/user.model';
import { UsuarioFormComponent } from './usuario-form.component';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule
  ],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            <div class="title-container">
              <div class="title-with-icon">
                <mat-icon>people</mat-icon>
                <h2>Gestión de Usuarios</h2>
              </div>
              <button mat-raised-button color="primary" (click)="openDialog()">
                <mat-icon>add</mat-icon>
                Nuevo Usuario
              </button>
            </div>
          </mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <table mat-table [dataSource]="usuarios()" class="mat-elevation-z2">
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>ID</th>
              <td mat-cell *matCellDef="let user">{{ user.id }}</td>
            </ng-container>

            <ng-container matColumnDef="username">
              <th mat-header-cell *matHeaderCellDef>Usuario</th>
              <td mat-cell *matCellDef="let user">{{ user.username }}</td>
            </ng-container>

            <ng-container matColumnDef="nombre">
              <th mat-header-cell *matHeaderCellDef>Nombre</th>
              <td mat-cell *matCellDef="let user">{{ user.nombre }}</td>
            </ng-container>

            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef>Email</th>
              <td mat-cell *matCellDef="let user">{{ user.email }}</td>
            </ng-container>

            <ng-container matColumnDef="role">
              <th mat-header-cell *matHeaderCellDef>Rol</th>
              <td mat-cell *matCellDef="let user">
                <mat-chip [class.admin-chip]="user.role === 'ADMIN'" [class.user-chip]="user.role === 'USER'">
                  {{ user.role === 'ADMIN' ? 'Administrador' : 'Usuario' }}
                </mat-chip>
              </td>
            </ng-container>

            <ng-container matColumnDef="acciones">
              <th mat-header-cell *matHeaderCellDef>Acciones</th>
              <td mat-cell *matCellDef="let user">
                <button mat-icon-button color="primary" (click)="openDialog(user)" title="Editar">
                  <mat-icon>edit</mat-icon>
                </button>
                <button
                  mat-icon-button
                  color="warn"
                  (click)="deleteUsuario(user.id)"
                  [disabled]="user.id === authService.currentUser()?.id"
                  title="Eliminar"
                >
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>

          @if (usuarios().length === 0) {
            <div class="no-data">
              <mat-icon>info</mat-icon>
              <p>No hay usuarios registrados</p>
            </div>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }

    mat-card {
      margin-bottom: 20px;
    }

    .title-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 10px 0;
    }

    .title-with-icon {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .title-with-icon h2 {
      margin: 0;
    }

    .title-with-icon mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
    }

    table {
      width: 100%;
      margin-top: 20px;
    }

    .no-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      color: #666;
    }

    .no-data mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 10px;
    }

    mat-chip {
      font-size: 12px;
      font-weight: 500;
    }

    .admin-chip {
      background-color: #f44336;
      color: white;
    }

    .user-chip {
      background-color: #4caf50;
      color: white;
    }
  `]
})
export class UsuariosListComponent implements OnInit {
  usuarios = signal<User[]>([]);
  displayedColumns: string[] = ['id', 'username', 'nombre', 'email', 'role', 'acciones'];

  constructor(
    protected authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.authService.getUsers().subscribe(usuarios => {
      this.usuarios.set(usuarios);
    });
  }

  openDialog(usuario?: User): void {
    const dialogRef = this.dialog.open(UsuarioFormComponent, {
      width: '500px',
      data: usuario ? { ...usuario } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (usuario) {
          this.authService.updateUser(result).subscribe(() => {
            this.loadUsuarios();
          });
        } else {
          this.authService.addUser(result).subscribe(() => {
            this.loadUsuarios();
          });
        }
      }
    });
  }

  deleteUsuario(id: number): void {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
      this.authService.deleteUser(id).subscribe(() => {
        this.loadUsuarios();
      });
    }
  }
}
