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


}
