import { Component, OnInit } from '@angular/core';
import { Venta } from 'src/app/entidades/venta/venta';


@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {
  ventasFiltradas: Venta[] = [];

  constructor() { }

  ngOnInit(): void {

  }



}

