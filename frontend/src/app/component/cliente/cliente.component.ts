import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/entidades/cliente/cliente';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { ClienteService } from 'src/app/servicios/cliente/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  //VAriable p para la Paginacion
  p: any;
  //Variable para la busqueda y filtro de tabla
  search: any;
  //FechaActual
  pipe = new DatePipe('en-US');
  fechaActual: any;
  //Button Update y Register
  btnRegister = false;
  btnUpdate = false;
  //Array de Clientes
  listadoClientes : Cliente[]=[];


  constructor(
    private formBuilder: FormBuilder,
    private alertas: AlertasService,
    private servicioCliente : ClienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(localStorage.length!=0){
      this.getCliente();
      this.btnRegister=true;
      this.mostrarHora();
    }else{
      this.alertas.alertToken();
      setTimeout(() => {this.router.navigate(['']);},2000)
    }

  }

  //Funcion para cuando abra el programa el boton upgrade pase a falso y no lo muestro
  openModal() {
    this.btnRegister = true;
    this.btnUpdate = false;
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

  //Formulario Cliente
  formularioCliente = this.formBuilder.group({
    id: [0],
    nombre: ['',[Validators.required]],
    descripcion: ['',[Validators.required]],
    telefono: ['',[Validators.required]]
  })

  getCliente():void{
    this.servicioCliente.getCliente().subscribe(
      (res) => {
        this.listadoClientes = res;
      },
      (error) => {
        console.log(error);
        this.alertas.error();
      }
    )
  }

  //Funcion para registrar clientes
  registrarCliente(): void {
    if (this.formularioCliente.valid){
      this.servicioCliente.postCliente(this.formularioCliente.value).subscribe(
        (res) => {
          this.alertas.registerOk();
          this.getCliente();
          this.limpiarFormulario();
        },
        (error) => {
          console.log(error);
        }
      )
    }else{
      this.alertas.error();
    }
  }

  //Funcion para obtener Cliente
  obtenerCliente(clienteId:number): void {
    this.btnUpdate=true;
    this.btnRegister=false;
    this.servicioCliente.getClienteId(clienteId).subscribe(
      (res) => {
        console.log(res);
        this.formularioCliente.patchValue({
          id: res[0].id,
          nombre: res[0].nombre,
          descripcion: res[0].descripcion,
          telefono: res[0].telefono,
        })
      }
    )
  }
  //Funcion para editar cliente
  editarCliente(): void {
    this.servicioCliente.putCliente(this.formularioCliente.value, this.formularioCliente.value.id).subscribe(
      (res) => {
        this.getCliente();
        this.alertas.updateOk();
        this.limpiarFormulario();
      },
      (error) => {
        console.log(error);
        this.alertas.error();
      }
    )
  }
    //Funcion para eliminar cliente
    eliminarCliente(id: number): void {
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
          this.servicioCliente.deleteCliente(id).subscribe((res) => {
            this.getCliente();
          });
          this.alertas.deleteOk();
        }
      });
    }

  //Funcion para limpiar formulario
  limpiarFormulario(): void {
    this.formularioCliente.reset();
    }




}
