import { Routes } from '@angular/router';
import { MainLayoutComponent } from './features/layout/main-layout.component';
import { AlumnosListComponent } from './features/alumnos/alumnos-list.component';
import { CursosListComponent } from './features/cursos/cursos-list.component';
import { InscripcionesListComponent } from './features/inscripciones/inscripciones-list.component';
import { UsuariosListComponent } from './features/usuarios/usuarios-list.component';
import { LoginComponent } from './features/auth/login.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'alumnos', pathMatch: 'full' },
      { path: 'alumnos', component: AlumnosListComponent },
      { path: 'cursos', component: CursosListComponent },
      { path: 'inscripciones', component: InscripcionesListComponent },
      {
        path: 'usuarios',
        component: UsuariosListComponent,
        canActivate: [adminGuard]
      }
    ]
  }
];
