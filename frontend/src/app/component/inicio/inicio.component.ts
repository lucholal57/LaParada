import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as $ from 'jquery';
import { LoginService } from 'src/app/servicios/login/login.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private servicioLogin: LoginService) { }

  isLoggedIn$!: Observable<boolean>;
  

  ngOnInit(): void {
    this.isLoggedIn$ = this.servicioLogin.isLoggedIn;
  }
  

  onLogout() {
    this.servicioLogin.logout();
  }

}
