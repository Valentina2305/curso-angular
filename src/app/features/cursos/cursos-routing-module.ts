import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaCursos } from '../../pages/cursos/lista-cursos/lista-cursos';
import { AbmCursos } from '../../pages/cursos/abm-cursos/abm-cursos';

const routes: Routes = [
  { path: '', component: ListaCursos },
  { path: 'nuevo', component: AbmCursos },
  { path: 'editar/:id', component: AbmCursos }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
