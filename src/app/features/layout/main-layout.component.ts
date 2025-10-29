import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule
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
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button mat-icon-button (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span>{{ title() }}</span>
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
  `]
})
export class MainLayoutComponent {
  title = signal('Sistema de Gestión de Cursos');
}
