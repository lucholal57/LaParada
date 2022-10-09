import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Producto } from 'src/app/entidades/producto/producto';
import { ProductoService } from '../../servicios/producto/producto.service';

import { DatePipe } from '@angular/common';
import { Venta } from 'src/app/entidades/venta/venta';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { VentaService } from 'src/app/servicios/venta/venta.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  //FechaActual
  pipe = new DatePipe('en-US');
  fechaActual:any;
  //Array para ir guardando los productos para la venta
  listadoProductosVenta: Producto[]=[];
  //Array de ventas para registrar
  listadoVenta: Venta[]=[];
  //Variable ngModel Productos para recibir el serie y si existe sumarlo al arrya de productosVentas
  producto:any;
  //Vriable para ir acumulando el precio
  sumatoria:any;
  //resultado resta. para calcular la diferencia de los que nos entregaron en efectivo restandole el total
  resultado:any;

  //Variable
  cuentaCorriente = false;
  //Variable vuelto para poder mostrar el contenedor del mismo
  vuelto = false;




  constructor(
    private formBuilder: FormBuilder,
    private servicioProducto: ProductoService,
    private alertas: AlertasService,
    private servicioVenta: VentaService,
  ) { }

  ngOnInit(): void {
    this.sumatoria=0;
    this.resultado=0;
    this.mostrarHora();
    this.reset();

  }

  //FormularioVenta
  formularioVenta = this.formBuilder.group({
    id:[''],
    forma_pago: ['',[Validators.required]],
    fecha: ['',[Validators.required]],
    total: ['',[Validators.required]],
    producto: [{},[Validators.required]],
    recibo_efectivo: [0,[Validators.required]],
    })
    //Funcion para editar producto, recibimos por parametro el numero de serie a buscar
    obtenerProductoSerie(buscarSerie : number): void {
      //Enviamos al servicio el numero de serie y si lo encuentra lo arrega a listadoProductoVenta
      this.servicioProducto.getProductoSerie(buscarSerie).subscribe(
        (res) => {
          if(res.length>0){
            //Si encuentra el producto lo agrega
          res.forEach( agrega => {
            //Si el producto existe le asignamos el valor a sumatoria del precio del producto
            //Tantas veces como valla agregando el mismo o distinto producto
            this.sumatoria+= parseInt(agrega.precio);
            //Y este se agrega al array listado ProductosVenta los cuales con ngFor se recorre para mostrar en la tabla
            this.listadoProductosVenta.push(agrega)
          })
          //Se deja en blanco el input despues de recibir un producto para ingresar mas
          this.producto=""
          console.log(this.listadoProductosVenta);
        }else{
          //Si el producto no existe se deja en blanco el input y se retorna una alerta mencionando que no existe
          this.producto="";
          this.alertas.productoNoExist();}
        },
        (error) => {
          console.log(error);
        }

      )
    }
    //Funcion para obtener el vuelto
    obtenerVuelto(): void {
      //Creamos la variable res la cual guardara el valor del compo en donde ingresa efectivo recibido para el vuelto
      var res:any;
      res=this.formularioVenta.value.recibo_efectivo
      //Una ves que obtenemos lo que ingreso a de efectivo, hacemos el calculo de resta y el resultado es el vuelto que hay que entregar
      this.resultado = (res-this.sumatoria)
    }


  //Funcion mostrar hora
  mostrarHora() {
    //Usamos otra variable de fecha por como recibe el backen es necesaria la misma, distinta a la que se muestra en el front por la hora
    this.fechaActual = this.pipe.transform(Date.now(), 'YYYY-MM-dd hh:mm:s ');
    //Intervalo para que despues de 1000mls se actualize la hora dandonos asi los segundos por pantalla.
    setInterval(() => {
      //utilizamos este formato de hora solo para mostrar en el front
      this.fechaActual = this.pipe.transform(Date.now(), 'YYYY-MM-dd hh:mm:ss ');
    }, 1000)
  }



//Funcion para los Checkbox ocultando input dependiendo la forma de pago
  formaDePago(): void {
    if(this.formularioVenta.value.forma_pago == "efectivo")
    {
      this.cuentaCorriente=false;
      this.vuelto=true;
    }
    if(this.formularioVenta.value.forma_pago == "tarjeta")
    {
      this.cuentaCorriente=false;
      this.vuelto=false;
    }
    if(this.formularioVenta.value.forma_pago == "cuentaCorriente")
    {
      this.cuentaCorriente=true;
      this.vuelto=false;
    }

  }
  //Funcion para eliminar producto de array
  quitar(producto:Producto) : void {
    //Obtenemos el indice del producto recibido al hacer click en eliminar para poder quitarlo del array
    var index=this.listadoProductosVenta.indexOf(producto);
    //Guardamos el index en index y eliminamos
    this.listadoProductosVenta.splice(index, 1);
    //A sumatoria tenemos que restarle el precio total a pagar ya que eliminamos un producto
    //Le restamos el valor del precio del producto recibido
    this.sumatoria -= parseInt(producto.precio);
  }

  //Funcion para registrar venta
  registrarVenta(): void {
    var idsProductos = new Array();
    this.formularioVenta.controls['fecha'].setValue(this.fechaActual)
    this.formularioVenta.controls['total'].setValue(this.sumatoria)
    this.listadoProductosVenta.forEach( a => {
      idsProductos.push(a.id)
    })
    this.formularioVenta.controls['producto'].setValue(idsProductos)
    this.servicioVenta.postVenta(this.formularioVenta.value).subscribe(
      (res) => {
        alert("registro exitoso")
        this.reset();
        this.listadoProductosVenta=new Array();
      },
      (error) => {
        console.log(error)
      }
    )


    console.log(this.formularioVenta.value)
  }

  //Funcion Reset papra limpiar el formulario
  reset(): void {
    this.formularioVenta.reset();
    this.vuelto=false;
    this.cuentaCorriente=false;
    this.resultado=0;
  }



}
