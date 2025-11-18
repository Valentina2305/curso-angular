import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav mode="side" opened class="sidenav">
        <div class="logo-container">
          <h2>Gestión Cursos</h2>
        </div>
        <mat-nav-list>
          <a mat-list-item routerLink="/alumnos" routerLinkActive="active-link">
            <mat-icon matListItemIcon>school</mat-icon>
            <span matListItemTitle>Alumnos</span>
          </a>
          <a mat-list-item routerLink="/cursos" routerLinkActive="active-link">
            <mat-icon matListItemIcon>book</mat-icon>
            <span matListItemTitle>Cursos</span>
          </a>
          <a mat-list-item routerLink="/inscripciones" routerLinkActive="active-link">
            <mat-icon matListItemIcon>assignment</mat-icon>
            <span matListItemTitle>Inscripciones</span>
          </a>
          @if (authService.isAdmin()) {
            <a mat-list-item routerLink="/usuarios" routerLinkActive="active-link">
              <mat-icon matListItemIcon>people</mat-icon>
              <span matListItemTitle>Usuarios</span>
            </a>
          }
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button mat-icon-button (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span>{{ title() }}</span>
          <span class="spacer"></span>
          <button mat-button [matMenuTriggerFor]="userMenu">
            <mat-icon>account_circle</mat-icon>
            <span>{{ authService.currentUser()?.nombre }}</span>
            <mat-icon>arrow_drop_down</mat-icon>
          </button>
          <mat-menu #userMenu="matMenu">
            <div class="user-info">
              <div class="user-name">{{ authService.currentUser()?.nombre }}</div>
              <div class="user-role">{{ authService.currentUser()?.role === 'ADMIN' ? 'Administrador' : 'Usuario' }}</div>
            </div>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="logout()">
              <mat-icon>exit_to_app</mat-icon>
              <span>Cerrar Sesión</span>
            </button>
          </mat-menu>
        </mat-toolbar>

        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
    }

    .sidenav {
      width: 250px;
      background-color: #f5f5f5;
    }

    .logo-container {
      padding: 20px;
      text-align: center;
      background-color: #3f51b5;
      color: white;
      margin-bottom: 10px;
    }

    .logo-container h2 {
      margin: 0;
      font-size: 20px;
    }

    .content {
      padding: 0;
    }

    mat-toolbar {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .active-link {
      background-color: #e3f2fd;
      color: #1976d2;
    }

    mat-nav-list a {
      margin-bottom: 5px;
    }

    mat-icon {
      color: #666;
    }

    .active-link mat-icon {
      color: #1976d2;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .user-info {
      padding: 16px;
      text-align: center;
    }

    .user-name {
      font-weight: 500;
      font-size: 16px;
      margin-bottom: 4px;
    }

    .user-role {
      font-size: 12px;
      color: #666;
    }

    mat-divider {
      margin: 8px 0;
    }
  `]
})
export class MainLayoutComponent {
  title = signal('Sistema de Gestión de Cursos');

  constructor(protected authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
