import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Producto } from 'src/app/entidades/producto/producto';
import { ProductoService } from '../../servicios/producto/producto.service';

import { DatePipe } from '@angular/common';
import { Venta } from 'src/app/entidades/venta/venta';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { VentaService } from 'src/app/servicios/venta/venta.service';
import { Cliente } from 'src/app/entidades/cliente/cliente';
import { ClienteService } from 'src/app/servicios/cliente/cliente.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Router } from '@angular/router';


@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
})
export class VentaComponent implements OnInit {
  //FechaActual
  pipe = new DatePipe('en-US');
  fechaActual: any;
  //Array para ir guardando los productos para la venta
  listadoProductosVenta: Producto[] = [];
  //Array de ventas para registrar
  listadoVenta: Venta[] = [];
  //Array para el listado de clientes para mostrar en el select
  listadoClientes: Cliente[] = [];
  //Variable ngModel Productos para recibir el serie y si existe sumarlo al arrya de productosVentas
  producto: any;
  //Vriable para ir acumulando el precio
  sumatoria: any;
  //resultado resta. para calcular la diferencia de los que nos entregaron en efectivo restandole el total
  resultado: any;
  //Intereses
  interes: any;





  //Variable para las cuentas corrientes y tarjetas
  cuentaCorriente = false;
  tarjeta = false;
  //Variable vuelto para poder mostrar el contenedor del mismo
  vuelto = false;

  dropdownSettings: IDropdownSettings = {};

  constructor(
    private formBuilder: FormBuilder,
    private servicioProducto: ProductoService,
    private alertas: AlertasService,
    private servicioVenta: VentaService,
    private servicioCliente: ClienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.interes = 0;
    if (localStorage.length != 0) {
      this.obtenerCliente();
      this.dropdownSettings = {
        singleSelection: true,
        idField: 'id',
        textField: 'nombre',
        itemsShowLimit: 5,
        allowSearchFilter: true,
        closeDropDownOnSelection: true,
      };
      this.sumatoria = 0;
      this.resultado = 0;
      this.mostrarHora();
      this.reset();
    } else {
      this.alertas.alertToken();
      setTimeout(() => {
        this.router.navigate(['']);
      }, 2000);
    }
  }

  //FormularioVenta
  formularioVenta = this.formBuilder.group({
    id: [''],
    forma_pago: ['', [Validators.required]],
    fecha: ['', [Validators.required]],
    total: ['', [Validators.required]],
    producto: [{}, [Validators.required]],
    recibo_efectivo: [0, [Validators.required]],
    interes: [0],
    cliente: [{}],
  });

  //Funcion para editar producto, recibimos por parametro el numero de serie a buscar
  obtenerProductoSerie(buscarSerie: String): void {
    var contador = 1;
    //Enviamos al servicio el numero de serie y si lo encuentra lo arrega a listadoProductoVenta
    this.servicioProducto.getProductoSerie(buscarSerie).subscribe(
      (res) => {

        if (res.length > 0) {
          res.forEach((elemento) => {
            this.listadoProductosVenta.push(elemento);
            /*
              if(this.listadoProductosVenta.length==0){
                this.listadoProductosVenta.push(elemento);
              }
            if(this.listadoProductosVenta.find((producto) => producto.id === elemento.id)){
              const indexCantidad = this.listadoProductosVenta.findIndex((producto) => producto.id === elemento.id);
              this.listadoProductosVenta[indexCantidad].cantidad--;
            }else{
              elemento.cantidad--;
              this.listadoProductosVenta.push(elemento);

            }
            */
            console.log(this.listadoProductosVenta)
            this.sumatoria += parseInt(elemento.precio);

          })
          this.producto = '';
        } else {
          this.producto = '';
          this.alertas.productoNoExist();
        }
      },
      (error) => {
        console.log(error);
      }

    );
  }
  //Funcion para obtener los clientes
  obtenerCliente(): void {
    this.servicioCliente.getCliente().subscribe(
      (res) => {
        this.listadoClientes = res;
        console.log(this.listadoClientes);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //Funcion para obtener el vuelto
  obtenerVuelto(): void {
    //Creamos la variable res la cual guardara el valor del compo en donde ingresa efectivo recibido para el vuelto
    var res: any;
    res = this.formularioVenta.value.recibo_efectivo;
    //Una ves que obtenemos lo que ingreso a de efectivo, hacemos el calculo de resta y el resultado es el vuelto que hay que entregar
    this.resultado = res - this.sumatoria;
  }

  //Funcion para obtener el total con intereses paga con tarjeta
  obtenerInteres() {
    this.interes = 0;
    //console.log(this.formularioVenta.value.interes);
    this.interes = (this.sumatoria * this.formularioVenta.value.interes!) / 100;
    this.sumatoria += this.interes;


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

  /*
  El descuento se hace en cada if con el change por que puede moverse entre efectivo,tarjeta,c.corriente, y el interes es 0 no se hace el descuento.
   */
  formaDePago(): void {
    if (this.formularioVenta.value.forma_pago == 'efectivo') {
      this.formularioVenta.controls.cliente.reset();
      this.formularioVenta.controls.interes.reset();
      this.cuentaCorriente = false;
      this.tarjeta = false;
      this.vuelto = true;
      //Se descuenta interes,dependiendo si el interes es distinto de 0
      if (this.interes != 0) {
        this.sumatoria -= this.interes;
        this.interes = 0;
      }
    }
    if (this.formularioVenta.value.forma_pago == 'tarjeta') {
      this.formularioVenta.controls.cliente.reset();
      this.formularioVenta.controls.interes.reset();
      this.formularioVenta.controls.recibo_efectivo.reset();
      this.cuentaCorriente = false;
      this.tarjeta = true;
      this.vuelto = false;
    }
    if (this.formularioVenta.value.forma_pago == 'cuentaCorriente') {
      this.formularioVenta.controls.interes.reset();
      this.formularioVenta.controls.recibo_efectivo.reset();
      this.tarjeta = false;
      this.cuentaCorriente = true;
      this.vuelto = false;
      //Se descuenta interes,dependiendo si el interes es distinto de 0
      if (this.interes != 0) {
        this.sumatoria -= this.interes;
        this.interes = 0;
      }
    }
  }
  //Funcion para eliminar producto de array
  quitar(producto: Producto): void {
    //Obtenemos el indice del producto recibido al hacer click en eliminar para poder quitarlo del array
    var index = this.listadoProductosVenta.indexOf(producto);
    //Guardamos el index en index y eliminamos
    this.listadoProductosVenta.splice(index, 1);
    //A sumatoria tenemos que restarle el precio total a pagar ya que eliminamos un producto
    //Le restamos el valor del precio del producto recibido
    if (this.sumatoria != 0) {
      this.sumatoria -= parseInt(producto.precio);
    }

  }

  //Funcion para registrar venta
  registrarVenta(): void {
    let array: Producto[] = [];
    //Si el listado es igual a 0 quiere decir que no agrego productos para la venta
    if (this.listadoProductosVenta.length == 0) {
      this.alertas.ventaSinProductos();
    } else {
      console.log("Cantidad de elementos en listado" + this.listadoProductosVenta.length)
      //Se crea array para obtener los ids de los productos que va a ir agregando
      var idsProductos = new Array();
      var contador =1;
      //Seteamos la fecha y el total de las sumatoria para registrar la venta
      this.formularioVenta.controls['fecha'].setValue(this.fechaActual);
      this.formularioVenta.controls['total'].setValue(this.sumatoria);
      //Recorremos el listadoProductosVenta de tipo producto
      //vamos agregando los ids para poder setearlo en el formulario para enviar y registrar la venta
      this.listadoProductosVenta.forEach((elemento) => {
        idsProductos.push(elemento.id);
      });
      console.log("ids de productos ", idsProductos);
      //Seteamos la venta
      this.formularioVenta.controls['producto'].setValue(idsProductos);
      //Accedemos al servicioVenta enviando el formulario
      this.servicioVenta.postVenta(this.formularioVenta.value).subscribe(
        (res) => {
          var count=1;
          for (let i = 0; i < this.listadoProductosVenta.length; i++) {
            if (this.listadoProductosVenta[i + 1].id === this.listadoProductosVenta[i].id) {
              console.log("cantidad " , count)
            }
          }

          this.sumatoria = 0;
          this.alertas.ventaOk();
          this.reset();
          this.listadoProductosVenta = new Array();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  //Funcion Reset papra limpiar el formulario
  reset(): void {
    this.formularioVenta.reset();
    this.vuelto = false;
    this.cuentaCorriente = false;
    this.resultado = 0;

  }
}

function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}
