import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
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
  pipe = new DatePipe('en-US');
  fecha:any;
  //Variable para Switch mostrar tablas
  switch = false;
  //Array de Ventas
  listadoVenta : Venta[]=[]
  //Array Ventas efectivo
  listadoVentaEfectivo: Venta[]=[];
  listadoVentaCc: Venta[]=[];

  constructor(
    private servicioVenta: VentaService,
    private alertas: AlertasService,
  ) { }

  ngOnInit(): void {
    this.obtenerVentas();
    this.switch=false;

  }

  obtenerVentas(): void {
    var hora:any;
    this.servicioVenta.getVenta().subscribe(
      (res) => {
        this.listadoVenta = res;
        this.listadoVenta.forEach(efectivo => {
          if(efectivo.forma_pago == "efectivo"){
            this.listadoVentaEfectivo.push(efectivo);
          }
          if(efectivo.forma_pago == "cuentaCorriente"){
            this.listadoVentaCc.push(efectivo);
          }

        })
        this.listadoVenta.forEach(a =>{
          console.log(a.fecha.toLocaleDateString)
        })
      }
    )
  }

}
