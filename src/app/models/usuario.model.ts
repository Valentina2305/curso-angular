export interface Usuario {
  id: number;
  username: string;
  password: string;
  nombre: string;
  email: string;
  rol: 'administrador' | 'usuario';
}
