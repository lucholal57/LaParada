import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { Producto } from 'src/app/entidades/producto/producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductoComponent implements OnInit {
  //VAriable p para la Paginacion
  p:any;
  //Variable para la busqueda y filtro de tabla 
  search:any;
  //Array de ´Productos
  listadoProductos : Producto[]=[];
  
  

  arrayProductos = [
    {
          
          "nombre": "Coca Cola",
          "descripcion": "Gaseosa 2.15L",
          "serie": "123",
          "cantidad": "10",
          "precio": "350"
      },
      {
        
          "nombre": "Fanta Naranja",
          "descripcion": "Gaseosa 1.5L",
          "serie": "456",
          "cantidad": "15",
          "precio": "220"
      },   {
        
        "nombre": "Cheetos",
        "descripcion": "50Grs",
        "serie": "111",
        "cantidad": "20",
        "precio": "150"
    },
    {
      
        "nombre": "Lays",
        "descripcion": "45Grs",
        "serie": "665",
        "cantidad": "30",
        "precio": "180"
    },
    {
      
      "nombre": "Doritos",
      "descripcion": "55Grs",
      "serie": "789",
      "cantidad": "10",
      "precio": "200"
  },
  {
    
      "nombre": "Monster",
      "descripcion": "500ml",
      "serie": "654",
      "cantidad": "40",
      "precio": "320"
  },
  {
          
    "nombre": "Coca Cola",
    "descripcion": "Gaseosa 2.15L",
    "serie": "123",
    "cantidad": "10",
    "precio": "350"
},
{
          
  "nombre": "Coca Cola",
  "descripcion": "Gaseosa 2.15L",
  "serie": "123",
  "cantidad": "10",
  "precio": "350"
},
{
          
  "nombre": "Coca Cola",
  "descripcion": "Gaseosa 2.15L",
  "serie": "123",
  "cantidad": "10",
  "precio": "350"
},
{
          
  "nombre": "Coca Cola",
  "descripcion": "Gaseosa 2.15L",
  "serie": "123",
  "cantidad": "10",
  "precio": "350"
},
{
          
  "nombre": "Coca Cola",
  "descripcion": "Gaseosa 2.15L",
  "serie": "123",
  "cantidad": "10",
  "precio": "350"
},
{
          
  "nombre": "Coca Cola",
  "descripcion": "Gaseosa 2.15L",
  "serie": "123",
  "cantidad": "10",
  "precio": "350"
},
{
          
  "nombre": "Coca Cola",
  "descripcion": "Gaseosa 2.15L",
  "serie": "123",
  "cantidad": "10",
  "precio": "350"
},
{
          
  "nombre": "Coca Cola",
  "descripcion": "Gaseosa 2.15L",
  "serie": "123",
  "cantidad": "10",
  "precio": "350"
},
{
          
  "nombre": "Coca Cola",
  "descripcion": "Gaseosa 2.15L",
  "serie": "123",
  "cantidad": "10",
  "precio": "350"
},
{
          
  "nombre": "Coca Cola",
  "descripcion": "Gaseosa 2.15L",
  "serie": "123",
  "cantidad": "10",
  "precio": "350"
},
{
          
  "nombre": "hamburguesas",
  "descripcion": "4 Unidades",
  "serie": "1323",
  "cantidad": "10",
  "precio": "350"
},
    
    ];

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
              ) { }
  
  ngOnInit(): void {
  }
  //Formulario Registro
  formularioRegistro = this.formBuilder.group({
    id:[''],
    nombre: ['',[Validators.required]],
    descripcion: ['',[Validators.required]],
    cantidad: ['',[Validators.required]],
    serie: ['',[Validators.required]],
    precio: ['',[Validators.required]]
  })

//Funcion para limpiar formulario
  limpiarFormulario():void {
    this.formularioRegistro.reset();
  }




}
