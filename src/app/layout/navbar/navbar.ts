import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  menuItems = [
    { path: '/alumnos', label: 'Alumnos', icon: 'people', adminOnly: false },
    { path: '/cursos', label: 'Cursos', icon: 'book', adminOnly: false },
    { path: '/inscripciones', label: 'Inscripciones', icon: 'assignment', adminOnly: false },
    { path: '/usuarios', label: 'Usuarios', icon: 'person', adminOnly: true }
  ];
  isAdmin: boolean = false;

  constructor(private rolService: RolService) {}

  ngOnInit(): void {
    this.rolService.rol$.subscribe(() => {
      this.isAdmin = this.rolService.isAdmin();
    });
  }
}
