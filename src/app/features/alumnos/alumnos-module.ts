import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosRoutingModule } from './alumnos-routing-module';
import { AlumnosService } from '../../services/alumnos.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AlumnosRoutingModule
  ],
  providers: [AlumnosService]
})
export class AlumnosModule { }
