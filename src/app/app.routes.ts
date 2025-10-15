import { Routes } from '@angular/router';
import { ListaAlumnos } from './pages/alumnos/lista-alumnos/lista-alumnos';
import { AbmAlumnos } from './pages/alumnos/abm-alumnos/abm-alumnos';
import { ListaCursos } from './pages/cursos/lista-cursos/lista-cursos';
import { AbmCursos } from './pages/cursos/abm-cursos/abm-cursos';
import { ListaInscripciones } from './pages/inscripciones/lista-inscripciones/lista-inscripciones';
import { AbmInscripciones } from './pages/inscripciones/abm-inscripciones/abm-inscripciones';
import { ListaUsuarios } from './pages/usuarios/lista-usuarios/lista-usuarios';
import { AbmUsuarios } from './pages/usuarios/abm-usuarios/abm-usuarios';

export const routes: Routes = [
  { path: '', redirectTo: '/alumnos', pathMatch: 'full' },
  { path: 'alumnos', component: ListaAlumnos },
  { path: 'alumnos/nuevo', component: AbmAlumnos },
  { path: 'alumnos/editar/:id', component: AbmAlumnos },
  { path: 'cursos', component: ListaCursos },
  { path: 'cursos/nuevo', component: AbmCursos },
  { path: 'cursos/editar/:id', component: AbmCursos },
  { path: 'inscripciones', component: ListaInscripciones },
  { path: 'inscripciones/nuevo', component: AbmInscripciones },
  { path: 'inscripciones/editar/:id', component: AbmInscripciones },
  { path: 'usuarios', component: ListaUsuarios },
  { path: 'usuarios/nuevo', component: AbmUsuarios },
  { path: 'usuarios/editar/:id', component: AbmUsuarios },
  { path: '**', redirectTo: '/alumnos' }
];
