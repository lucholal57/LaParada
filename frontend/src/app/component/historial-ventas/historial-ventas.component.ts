import { Component, OnInit } from '@angular/core';
import { DatePipe, getLocaleDateFormat } from '@angular/common';
import { Venta } from 'src/app/entidades/venta/venta';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { VentaService } from 'src/app/servicios/venta/venta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial-ventas',
  templateUrl: './historial-ventas.component.html',
  styleUrls: ['./historial-ventas.component.css']
})
export class HistorialVentasComponent implements OnInit {
  //FechaActual
  pipe = new DatePipe('en-US');
  fechaActual: any;
  //Variable para el pipe de busqueda
  search:any
  //Variable para el paginado
  p:any;

  fechaInicio: string=""; // Propiedad para almacenar la fecha y hora de inicio del rango
  fechaFin: string=""; // Propiedad para almacenar la fecha y hora de fin del rango


  fecha:any;
  //Variable para Switch mostrar tablas
  switch = false;
  //Array de Ventas
  listadoVenta : Venta[]=[]

  constructor(
    private servicioVenta: VentaService,
    private alertas: AlertasService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(localStorage.length!=0){
      this.obtenerVentas();
    }else{
      this.alertas.alertToken();
      setTimeout(() => {this.router.navigate(['']);},2000)
    }


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
        )}

         // Función para calcular el total de las ventas dentro del rango de fechas seleccionado
  calcularTotalVentas(): void {
    // Convertir las fechas de tipo string a objetos Date
    const fechaInicio = new Date(this.fechaInicio);
    const fechaFin = new Date(this.fechaFin);

}

}
