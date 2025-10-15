import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { USUARIOS_DATA } from '../data/usuarios.data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuariosSubject = new BehaviorSubject<Usuario[]>(USUARIOS_DATA);
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser$: Observable<Usuario | null> = this.currentUserSubject.asObservable();

  constructor() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(username: string, password: string): boolean {
    const usuario = this.usuariosSubject.value.find(
      u => u.username === username && u.password === password
    );

    if (usuario) {
      this.currentUserSubject.next(usuario);
      localStorage.setItem('currentUser', JSON.stringify(usuario));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): Usuario | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.rol === 'administrador';
  }

  isUsuario(): boolean {
    const user = this.currentUserSubject.value;
    return user?.rol === 'usuario';
  }

  getUsuarios(): Usuario[] {
    return this.usuariosSubject.value;
  }

  getUsuarioById(id: number): Usuario | undefined {
    return this.usuariosSubject.value.find(usuario => usuario.id === id);
  }

  addUsuario(usuario: Usuario): void {
    const usuarios = this.usuariosSubject.value;
    const newId = Math.max(...usuarios.map(u => u.id), 0) + 1;
    const newUsuario = { ...usuario, id: newId };
    this.usuariosSubject.next([...usuarios, newUsuario]);
  }

  updateUsuario(usuario: Usuario): void {
    const usuarios = this.usuariosSubject.value;
    const index = usuarios.findIndex(u => u.id === usuario.id);
    if (index !== -1) {
      usuarios[index] = usuario;
      this.usuariosSubject.next([...usuarios]);
    }
  }

  deleteUsuario(id: number): void {
    const usuarios = this.usuariosSubject.value.filter(u => u.id !== id);
    this.usuariosSubject.next(usuarios);
  }
}
