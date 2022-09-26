import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  p:any;
  //Variable para la busqueda y filtro de tabla 
  search:any;
  //Array de ´Productos
  listadoProductos : Producto[]=[];
  
  constructor(
    private formBuilder: FormBuilder,
    private servicioProducto: ProductoService,
    private alertas: AlertasService
              ) { }
  
  ngOnInit(): void {
    this.getProducto();
  }

  //Formulario Registro
  formularioRegistro = this.formBuilder.group({
    id: [0],
    nombre: ['',[Validators.required]],
    descripcion: ['',[Validators.required]],
    cantidad: ['',[Validators.required]],
    serie: ['',[Validators.required]],
    precio: ['',[Validators.required]]
  })

  //Funcion get para obtener productos
  getProducto():void{
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
    if(this.formularioRegistro.valid){
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
    else{
      this.alertas.error();
    }
  }
  //Funcion para editar producto
  obtenerProducto(productoId : number): void {
    this.servicioProducto.getProductoId(productoId).subscribe(
      (res) => {
        console.log(res);
        this.formularioRegistro.patchValue({
          id: res[0].id,
          nombre: res[0].nombre,
          descripcion: res[0].descripcion,
          cantidad:res[0].cantidad,
          serie: res[0].serie,
          precio: res[0].precio,
        })
      }
    )
  }
  //Funcion para editar producto
  editarProducto(): void {
    this.servicioProducto.putProducto(this.formularioRegistro.value,this.formularioRegistro.value.id).subscribe(
      (res) => {
        this.getProducto();
        this.alertas.updateOk();
      },
      (error) => {
        console.log(error);
        this.alertas.error();
      }
    )
  }
  //Funcion para eliminar producto
  eliminarProducto(id:number): void {
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
  limpiarFormulario():void {
    this.formularioRegistro.reset();
  }





}
