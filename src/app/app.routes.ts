import { Routes } from '@angular/router';
import { MainLayoutComponent } from './features/layout/main-layout.component';
import { AlumnosListComponent } from './features/alumnos/alumnos-list.component';
import { CursosListComponent } from './features/cursos/cursos-list.component';
import { InscripcionesListComponent } from './features/inscripciones/inscripciones-list.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'alumnos', pathMatch: 'full' },
      { path: 'alumnos', component: AlumnosListComponent },
      { path: 'cursos', component: CursosListComponent },
      { path: 'inscripciones', component: InscripcionesListComponent }
    ]
  }
];
