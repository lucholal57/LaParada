import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) { }

  login(formularioLogin : any) {
    if (formularioLogin.nombre !== '' && formularioLogin.password !== '' ) {
      this.loggedIn.next(true);
      this.router.navigate(['/venta']);
    }
    else{
      alert("EL usuario no se encuentra registrado");
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }


}
