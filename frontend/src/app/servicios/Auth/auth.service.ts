import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioAutenticado: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public usuarioAutenticado$: Observable<string> = this.usuarioAutenticado.asObservable();

  constructor() {
    // Obtener el nombre de usuario del localStorage al inicializar el servicio
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    if (nombreUsuario) {
      this.usuarioAutenticado.next(nombreUsuario);
    }
  }
  // Método para actualizar el estado de autenticación con el nombre de usuario
  public actualizarEstadoAutenticacion(nombreUsuario: string): void {
    this.usuarioAutenticado.next(nombreUsuario);
    localStorage.setItem('nombreUsuario', nombreUsuario);
  }

  // Método para obtener el estado de autenticación como observable
  public getEstadoAutenticacion(): Observable<string> {
    return this.usuarioAutenticado$;
  }
}
