import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Producto } from 'src/app/entidades/producto/producto';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  //FechaActual
  fechaActual = Date.now();
  hora:any;

  litadoVenta: Producto[]=[];
  

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.mostrarHora();
  }
  
  //Funcion mostrar hora
  mostrarHora() {
    this.hora = new Date();
    //Intervalo para que despues de 1000mls se actualize la hora dandonos asi los segundos por pantalla.
    setInterval(() => {

      this.hora = new Date();

    }, 1000)
  }


  //FormularioVenta
  formularioVenta = this.formBuilder.group({
  id:[''],
  forma_pago: ['',[Validators.required]],
  fecha: ['',[Validators.required]],
  producto: ['',[Validators.required]],
  total: ['',[Validators.required]],
  })



}
