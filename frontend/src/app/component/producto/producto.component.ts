import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/entidades/producto/producto';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import Swal from 'sweetalert2';
import { ProductoService } from '../../servicios/producto/producto.service';



@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  //VAriable p para la Paginacion
  p: any;
  //Variable para la busqueda y filtro de tabla
  search: any;
  //FechaActual
  pipe = new DatePipe('en-US');
  fechaActual: any;
  //Array de ´Productos
  listadoProductos: Producto[] = [];
  //Button Update y Register
  btnRegister=false;
  btnUpdate=false;

  constructor(
    private formBuilder: FormBuilder,
    private servicioProducto: ProductoService,
    private alertas: AlertasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(localStorage.length!=0){
      this.btnRegister=true;
      this.getProducto();
      this.mostrarHora();
    }else{
      this.alertas.alertToken();
      setTimeout(() => {this.router.navigate(['']);},2000)
    }

  }

  //Funcion para cuando abra el programa el boton upgrade pase a falso y no lo muestro
  openModal() {
    this.btnRegister=true;
    this.btnUpdate=false;
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

  //Formulario Registro
  formularioRegistro = this.formBuilder.group({
    id: [0],
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    cantidad: ['', [Validators.required]],
    serie: ['', [Validators.required]],
    precio: ['', [Validators.required]]
  })

  //Funcion get para obtener productos
  getProducto(): void {
    this.servicioProducto.getProducto().subscribe(
      (res) => {
        this.listadoProductos = res;
      },
      (error) => {
        console.log(error);
        this.alertas.error();
      }
    )
  }

  //Funcion para registrar Productos
  registrarProducto(): void {
    if (this.formularioRegistro.valid) {
      this.servicioProducto.postProducto(this.formularioRegistro.value).subscribe(
        (res) => {
          this.alertas.registerOk();
          this.getProducto();
          this.limpiarFormulario();
        },
        (error) => {
          console.log(error);
        }
      )
    }
    else {
      this.alertas.error();
    }
  }
  //Funcion para obtener producto
  obtenerProducto(productoId: number): void {
    this.btnUpdate=true;
    this.btnRegister=false;
    this.servicioProducto.getProductoId(productoId).subscribe(
      (res) => {
        console.log(res);
        this.formularioRegistro.patchValue({
          id: res[0].id,
          nombre: res[0].nombre,
          descripcion: res[0].descripcion,
          cantidad: res[0].cantidad,
          serie: res[0].serie,
          precio: res[0].precio,
        })
      }
    )
  }
  //Funcion para editar producto
  editarProducto(): void {
    this.servicioProducto.putProducto(this.formularioRegistro.value, this.formularioRegistro.value.id).subscribe(
      (res) => {
        this.getProducto();
        this.alertas.updateOk();
        this.limpiarFormulario();
      },
      (error) => {
        console.log(error);
        this.alertas.error();
      }
    )
  }
  //Funcion para eliminar producto
  eliminarProducto(id: number): void {
    Swal.fire({
      title: 'Esta seguro de eliminar??',
      text: 'No podra revertir el cambio!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioProducto.deleteProducto(id).subscribe((res) => {
          this.getProducto();
        });
        this.alertas.deleteOk();
      }
    });
  }

  //Funcion para limpiar formulario
  limpiarFormulario(): void {
    this.formularioRegistro.reset();
  }





}
