import { Usuario } from '../models/usuario.model';

export const USUARIOS_DATA: Usuario[] = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    nombre: 'Administrador',
    email: 'admin@sistema.com',
    rol: 'administrador'
  },
  {
    id: 2,
    username: 'usuario1',
    password: 'user123',
    nombre: 'Juan Usuario',
    email: 'juan.usuario@sistema.com',
    rol: 'usuario'
  },
  {
    id: 3,
    username: 'usuario2',
    password: 'user123',
    nombre: 'María Usuario',
    email: 'maria.usuario@sistema.com',
    rol: 'usuario'
  }
];
