import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as $ from 'jquery';
import { LoginService } from 'src/app/servicios/login/login.service';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/Auth/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  nombreUsuario: String = '';

  constructor(public servicioLogin: LoginService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    // Suscribirse al observable de estado de autenticación en el servicio
    this.authService.usuarioAutenticado$.subscribe((nombreUsuario: string) => {
      // Actualizar la información del nombre de usuario en el componente cuando cambie el estado de autenticación
      this.nombreUsuario = nombreUsuario;
    });

    $(document).ready(function () {
      var trigger = $('.hamburger'),
        overlay = $('.overlay'),
        isClosed = false;

      trigger.click(function () {
        hamburger_cross();
      });

      function hamburger_cross() {
        if (isClosed == true) {
          overlay.hide();
          trigger.removeClass('is-open');
          trigger.addClass('is-closed');
          isClosed = false;
        } else {
          overlay.show();
          trigger.removeClass('is-closed');
          trigger.addClass('is-open');
          isClosed = true;
        }
      }

      $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
      });
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('');
  }
}
