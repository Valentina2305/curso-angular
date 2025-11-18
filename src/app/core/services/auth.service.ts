import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSignal = signal<User | null>(null);
  private users = signal<User[]>([
    {
      id: 1,
      username: 'admin',
      password: 'admin123',
      role: UserRole.ADMIN,
      nombre: 'Administrador',
      email: 'admin@cursos.com'
    },
    {
      id: 2,
      username: 'usuario',
      password: 'user123',
      role: UserRole.USER,
      nombre: 'Usuario Regular',
      email: 'usuario@cursos.com'
    }
  ]);

  currentUser = this.currentUserSignal.asReadonly();
  isAuthenticated = computed(() => this.currentUserSignal() !== null);
  isAdmin = computed(() => this.currentUserSignal()?.role === UserRole.ADMIN);
  isUser = computed(() => this.currentUserSignal()?.role === UserRole.USER);

  constructor(private router: Router) {
    this.loadUserFromStorage();
  }

  login(username: string, password: string): boolean {
    const user = this.users().find(
      u => u.username === username && u.password === password
    );

    if (user) {
      this.currentUserSignal.set(user);
      this.saveUserToStorage(user);
      return true;
    }

    return false;
  }

  logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getUsers(): User[] {
    return this.users();
  }

  addUser(user: User): void {
    const newUser = {
      ...user,
      id: Math.max(...this.users().map(u => u.id), 0) + 1
    };
    this.users.update(users => [...users, newUser]);
  }

  updateUser(updatedUser: User): void {
    this.users.update(users =>
      users.map(u => u.id === updatedUser.id ? updatedUser : u)
    );
  }

  deleteUser(id: number): void {
    this.users.update(users => users.filter(u => u.id !== id));
  }

  private saveUserToStorage(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  private loadUserFromStorage(): void {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        this.currentUserSignal.set(user);
      } catch (error) {
        localStorage.removeItem('currentUser');
      }
    }
  }
}
