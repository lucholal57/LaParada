import { Component, OnInit } from '@angular/core';
import { Caja } from 'src/app/entidades/caja/caja';
import { CajaService } from 'src/app/servicios/caja/caja.service';
//La libreria tiene que tener el /auto para su correcto funcionamiento
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {
  listadoCaja: Caja[] = [];
  fechas = [];
  //Variable p para la Paginacion
  p: any;
  //Variable para la busqueda y filtro de tabla
  search: any;

  public chart: any;

  constructor(
    private servicioCaja: CajaService
  ) { }

  ngOnInit(): void {
    this.getCaja();
    var myChart = new Chart("myChart", {
      type: 'bar',
      data: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre','Octubre','Noviembre','Diciembre'],
          datasets: [{
              label: 'Data1',
              data: [1, 19, 3, 5, 2, 3,2,4,6,21,45,12],
              backgroundColor:"#0196FD",
              borderColor: "#0196FD",
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });

  }



  getCaja(): void {
    this.servicioCaja.getCaja().subscribe(
      (res) => {
        this.listadoCaja = res;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  dashboard(): void {
    const myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: ['Faltantes', 'Pantalla', 'Tornillos', 'Asistencias'],
        datasets: [{
          label: 'TM',
          //Se deja al final el valor 0 y un maximo para que las barrar tengan donde empezar y terminar
          data: [1,6],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'TT',
          //Se deja al final el valor 0 y un maximo para que las barrar tengan donde empezar y terminar
          data: [1,2,3,4,5,6],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }],

      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    });

  }



}

