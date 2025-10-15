import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../models/usuario.model';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-lista-usuarios',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.css'
})
export class ListaUsuarios implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'nombre', 'email', 'rol', 'acciones'];
  dataSource: Usuario[] = [];
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private rolService: RolService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rolService.rol$.subscribe(() => {
      this.isAdmin = this.rolService.isAdmin();
    });
    this.dataSource = this.authService.getUsuarios();
  }

  agregarUsuario(): void {
    this.router.navigate(['/usuarios/nuevo']);
  }

  editarUsuario(id: number): void {
    this.router.navigate(['/usuarios/editar', id]);
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
      this.authService.deleteUsuario(id);
      this.dataSource = this.authService.getUsuarios();
    }
  }
}
