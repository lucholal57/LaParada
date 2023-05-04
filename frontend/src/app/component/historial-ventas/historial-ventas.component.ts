import { Component, OnInit } from '@angular/core';
import { DatePipe, getLocaleDateFormat } from '@angular/common';
import { Venta } from 'src/app/entidades/venta/venta';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { VentaService } from 'src/app/servicios/venta/venta.service';
import { Router } from '@angular/router';
import { CajaService } from 'src/app/servicios/caja/caja.service';


@Component({
  selector: 'app-historial-ventas',
  templateUrl: './historial-ventas.component.html',
  styleUrls: ['./historial-ventas.component.css']
})
export class HistorialVentasComponent implements OnInit {
  //Variable para el pipe de busqueda
  search: any
  //Variable para el paginado
  p: any;

  fechaInicio: string = ""; // Propiedad para almacenar la fecha y hora de inicio del rango
  fechaFin: string = ""; // Propiedad para almacenar la fecha y hora de fin del rango


  fecha: any;
  //Variable para Switch mostrar tablas
  switch = false;
  //Array de Ventas
  listadoVenta: Venta[] = []
  ventasFiltradas: Venta[] = [];

  constructor(
    private servicioVenta: VentaService,
    private alertas: AlertasService,
    private router: Router,
    private servicioCaja: CajaService
  ) { }

  ngOnInit(): void {
    if (localStorage.length != 0) {
      this.obtenerVentas();
    } else {
      this.alertas.alertToken();
      setTimeout(() => { this.router.navigate(['']); }, 2000)
    }


  }
  obtenerVentas(): void {
    this.servicioVenta.getVenta().subscribe(
      (res) => {
        this.listadoVenta = res;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  // Función para filtrar las ventas por fecha y almacenarlas en un nuevo array
  filtrarVentasPorFecha(): void {
    // Convierte las fechas de inicio y fin a objetos Date
    const fechaInicio = new Date(this.fechaInicio);
    const fechaFin = new Date(this.fechaFin);
    // Filtra las ventas que estén dentro del rango de fechas y las guarda en el nuevo array
    this.ventasFiltradas = this.listadoVenta.filter(venta => {
      const fechaVenta = new Date(venta.fecha);
      return fechaVenta >= fechaInicio && fechaVenta <= fechaFin;
    });
    const t = {
      total:this.calcularTotalVentas()
    }
    if(t!= null || t!=""){
      this.servicioCaja.postCaja(t).subscribe(
        (res) => {
          console.log(res);
          this.ventasFiltradas.forEach(a => {
            this.servicioVenta.deleteVenta(a.id).subscribe(
              (res) => {
                console.log(res);
                this.obtenerVentas();
              },
              (error) => {
                console.log(error);
              }
            )
          })
          this.resetFechas();
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

  // Función para calcular el total de ventas dentro del rango de fechas seleccionado
  calcularTotalVentas(): number {
    let total = 0;
    // Recorre el nuevo array de ventas filtradas y suma los totales de las ventas
    for (const venta of this.ventasFiltradas) {
      total += parseInt(venta.total);
    }
    return total;
  }

  resetFechas(): void {
    this.fechaInicio="";
    this.fechaFin="";
  }

}
