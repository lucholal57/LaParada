import { Component, OnInit } from '@angular/core';
import { DatePipe, getLocaleDateFormat } from '@angular/common';
import { Venta } from 'src/app/entidades/venta/venta';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { VentaService } from 'src/app/servicios/venta/venta.service';

@Component({
  selector: 'app-historial-ventas',
  templateUrl: './historial-ventas.component.html',
  styleUrls: ['./historial-ventas.component.css']
})
export class HistorialVentasComponent implements OnInit {
  //Variable para el pipe de busqueda
  search:any
  //Variable para el paginado
  p:any;
  //Pipe para la fecha

  fecha:any;
  //Variable para Switch mostrar tablas
  switch = false;
  //Array de Ventas
  listadoVenta : Venta[]=[]

  constructor(
    private servicioVenta: VentaService,
    private alertas: AlertasService,
  ) { }

  ngOnInit(): void {
    this.obtenerVentas();
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
}