import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { LoginService } from 'src/app/servicios/login/login.service';

// Constante de los headers para los encabezados con TOKEN de Autorizacion
const httpOption = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
    'Authorization': 'Token' + " " + localStorage.getItem('token')
  }),
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private formSubmitAttempt: boolean=false;;

  constructor(
    private servicioLogin: LoginService,
    private formBuilder: FormBuilder,
    private router : Router,
    private alertas: AlertasService
  ) { }

  ngOnInit(): void {
  }

  //Se crea formulario para poder obtener el usuario y password para acceder al programa sin mostrar la barra navbar antes de que este logueado
  formularioLogin = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  login(): void {
    const user = { username: this.formularioLogin.value.username, password: this.formularioLogin.value.password }
    this.servicioLogin.login(user).subscribe(
      (res) => {
        localStorage.setItem("token", res.token)
        //Despues de setear y almacenar el token a localstorage, con router nos redirigimos a la pagina dhasboard y recargamos una ves dentro por que si no recargamos no detecta el TOKEN.
        this.router.navigateByUrl('/venta').then(() =>{
          window.location.reload();
        })

      },
      (error) => {
        this.alertas.errorLogin()
        this.formularioLogin.reset();
      }

    )

  }


}
