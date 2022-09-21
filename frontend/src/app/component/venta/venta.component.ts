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
  //Variable
  cuentaCorriente = false;
  //Variable vuelto para poder mostrar el contenedor del mismo
  vuelto = false;

  litadoVenta: Producto[]=[];
  

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.mostrarHora();
    this.reset();
    
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
  cliente: ['',[Validators.required]],
  direccion: ['',[Validators.required]],
  telefono: ['',[Validators.required]],
  total: ['',[Validators.required]],
  })

//Funcion para los Checkbox ocultando input dependiendo la forma de pago
  formaDePago(): void {
    if(this.formularioVenta.value.forma_pago == "EFECTIVO")
    {
      this.cuentaCorriente=false;
      this.vuelto=true;
    }
    if(this.formularioVenta.value.forma_pago == "TARJETA")
    {
      this.cuentaCorriente=false;
      this.vuelto=false;
    }
    if(this.formularioVenta.value.forma_pago == "CUENTAC")
    {
      this.cuentaCorriente=true;
      this.vuelto=false;
    }
    
  }
  //Funcion Reset papra limpiar el formulario
  reset(): void {
    this.formularioVenta.reset();
    this.vuelto=false;
    this.cuentaCorriente=false;
  }



}
