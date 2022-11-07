import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor() { }

//alerta registro ok
registerOk(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Producto Registrado!',
    showConfirmButton: false,
    timer: 1200
  })
}
//alerta registro ok
deleteOk(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Producto Eliminado!',
    showConfirmButton: false,
    timer: 1200
  })
}
//Alerta sin token
alertToken(){
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'No inicio Sesion, Redirigiendo',
    showConfirmButton: false,
    timer: 2000
  })
}
//alerta actualizacion ok
updateOk(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Producto Actualizado!',
    showConfirmButton: false,
    timer: 1200
  })
}
//alerta venta ok
ventaOk(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Venta Exitosa!',
    showConfirmButton: false,
    timer: 1200
  })
}
//alerta error
error(){
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Algo Salio Mal Consulte al Admin del Software!',
  })
}

errorLogin(){
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'EL usuario no se encuentra en la Base de Datos',
  })
}
//alert el producto no existe
productoNoExist(){
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'El producto no se Encuentra!',
    showConfirmButton: false,
    timer: 1200
  })
}

//alert el producto ya existe
productoExist(){
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'El producto ya existe!',
    showConfirmButton: false,
    timer: 1200
  })
}

//alert el producto ya existe
ventaSinProductos(){
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'No agrego Productos a la venta!',
    showConfirmButton: false,
    timer: 1200
  })
}

//alert el producto ya existe
pocoStock(){
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'El Stock de Producto es menor o igual a 5 !!!!!',
    showConfirmButton: false,
    timer: 1500
  })
}

//alert el producto ya existe
sinStock(){
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'Producto sin Stock!',
    showConfirmButton: false,
    timer: 1200
  })
}

}
