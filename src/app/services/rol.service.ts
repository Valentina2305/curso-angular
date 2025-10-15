import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

type Rol = 'administrador' | 'usuario';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private rolSubject = new BehaviorSubject<Rol>('administrador');
  public rol$: Observable<Rol> = this.rolSubject.asObservable();

  constructor() {}

  getRol(): Rol {
    return this.rolSubject.value;
  }

  setRol(rol: Rol): void {
    this.rolSubject.next(rol);
  }

  isAdmin(): boolean {
    return this.rolSubject.value === 'administrador';
  }

  isUsuario(): boolean {
    return this.rolSubject.value === 'usuario';
  }
}
