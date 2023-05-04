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
  }

  getCaja(): void {
    this.servicioCaja.getCaja().subscribe(
      (res) => {
        this.listadoCaja = res;
        this.dashboard();
        console.log(res)
      },
      (error) => {
        console.log(error);
      }
    )
  }

  dashboard(): void {
    const labels = [
      { mes: 0, nombreMes: 'Enero' },
      { mes: 1, nombreMes: 'Febrero' },
      { mes: 2, nombreMes: 'Marzo' },
      { mes: 3, nombreMes: 'Abril' },
      { mes: 4, nombreMes: 'Mayo' },
      { mes: 5, nombreMes: 'Junio' },
      { mes: 6, nombreMes: 'Julio' },
      { mes: 7, nombreMes: 'Agosto' },
      { mes: 8, nombreMes: 'Septiembre' },
      { mes: 9, nombreMes: 'Octubre' },
      { mes: 10, nombreMes: 'Noviembre' },
      { mes: 11, nombreMes: 'Diciembre' }
    ];
    const totalesPorMes: {[mes: number]: number} = {};
    this.listadoCaja.forEach(caja => {
      const fecha = new Date(caja.fecha);
      const mes = fecha.getMonth();
      if (!totalesPorMes[mes]) {
        totalesPorMes[mes] = 0;
      }
      totalesPorMes[mes] += +(caja.total);
    });

    const datos = labels.map(item => totalesPorMes[item.mes] || 0);
    const myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: labels.map(item => item.nombreMes),
        datasets: [{
          label: 'Cierre Caja x Mes',
          data: datos,
          backgroundColor: "#0196FD",
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




}

