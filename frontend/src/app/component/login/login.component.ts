import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private servicioLogin : LoginService,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {

  }

  //Se crea formulario para poder obtener el usuario y password para acceder al programa sin mostrar la barra navbar antes de que este logueado
  formularioLogin = this.formBuilder.group({
    usuario :['', [Validators.required]],
    password : ['',[Validators.required]]
  })

  onSubmit() {
    this.servicioLogin.login(this.formularioLogin.value);
  }

  onLogout() {
    this.servicioLogin.logout();
  }

}
