import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAlumnos } from '../../pages/alumnos/lista-alumnos/lista-alumnos';
import { AbmAlumnos } from '../../pages/alumnos/abm-alumnos/abm-alumnos';

const routes: Routes = [
  { path: '', component: ListaAlumnos },
  { path: 'nuevo', component: AbmAlumnos },
  { path: 'editar/:id', component: AbmAlumnos }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
