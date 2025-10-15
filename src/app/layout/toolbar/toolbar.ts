import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'app-toolbar',
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css'
})
export class Toolbar {
  title = 'Sistema de Gestión de Asistentes';
  @Output() sidenavToggle = new EventEmitter<void>();
  rolActual: string = 'administrador';

  constructor(private rolService: RolService) {
    this.rolActual = this.rolService.getRol();
  }

  toggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  cambiarRol(rol: string): void {
    this.rolService.setRol(rol as 'administrador' | 'usuario');
    this.rolActual = rol;
  }
}
