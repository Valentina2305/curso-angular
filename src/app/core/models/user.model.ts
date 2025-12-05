export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
  nombre: string;
  email: string;
  direccion: string;
  telefono: string;
}
