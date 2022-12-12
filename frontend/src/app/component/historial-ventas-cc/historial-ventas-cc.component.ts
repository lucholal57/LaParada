import { Component, OnInit } from '@angular/core';
import { DatePipe, getLocaleDateFormat } from '@angular/common';
import { Venta } from 'src/app/entidades/venta/venta';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { VentaService } from 'src/app/servicios/venta/venta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial-ventas-cc',
  templateUrl: './historial-ventas-cc.component.html',
  styleUrls: ['./historial-ventas-cc.component.css']
})
export class HistorialVentasCcComponent implements OnInit {
  //FechaActual
  pipe = new DatePipe('en-US');
  fechaActual: any;
  //Variable para el pipe de busqueda
  search: any
  //Variable para el paginado
  p: any;
  //Pipe para la fecha

  fecha: any;
  //Variable para Switch mostrar tablas
  switch = false;
  //Array de Ventas
  listadoVenta: Venta[] = []
  //Listado ventas con Clientes
  listadoVentasCC = [];

  constructor(
    private servicioVenta: VentaService,
    private alertas: AlertasService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (localStorage.length != 0) {
      this.obtenerVentas();
    } else {
      this.alertas.alertToken();
      setTimeout(() => { this.router.navigate(['']); }, 2000)
    }
    this.mostrarHora();

  }

  //Funcion mostrar hora
  mostrarHora() {
    //Usamos otra variable de fecha por como recibe el backen es necesaria la misma, distinta a la que se muestra en el front por la hora
    this.fechaActual = this.pipe.transform(Date.now(), 'YYYY-MM-dd hh:mm:s ');
    //Intervalo para que despues de 1000mls se actualize la hora dandonos asi los segundos por pantalla.
    setInterval(() => {
      //utilizamos este formato de hora solo para mostrar en el front
      this.fechaActual = this.pipe.transform(
        Date.now(),
        'YYYY-MM-dd hh:mm:ss '
      );
    }, 1000);
  }


  obtenerVentas(): void {
    this.servicioVenta.getVenta().subscribe(
      (res) => {
        this.listadoVenta = res;
        console.log(this.listadoVenta)
      },
      (error) => {
        console.log(error);
      }
    )
  }
}

