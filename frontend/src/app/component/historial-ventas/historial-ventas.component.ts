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
  pipe = new DatePipe('en-US');
  fecha:any;
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
    var hora:any;
    this.servicioVenta.getVenta().subscribe(
      (res) => {
        this.listadoVenta = res;
        this.listadoVenta.forEach( a => {
          hora = this.pipe.transform((a.fecha), 'YYYY-MM-dd hh+3:mm:ss ');
        })
        console.log("fechaaaa"+hora)
      }
    )
  }

}
