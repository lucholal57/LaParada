import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from '../../entidades/venta/venta';

// Constante de los headers para los encabezados con TOKEN de Autorizacion
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')}),
}

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  //Variables para las rudas dev y prod
private url_dev = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) { }

  //get venta
  getVenta():Observable<Venta[]> {
    return this.http.get<Venta[]>(this.url_dev + 'venta');
  }
  //post venta
  postVenta(formularioVenta:any):Observable<Venta[]> {
    return this.http.post<Venta[]>(this.url_dev + 'venta', formularioVenta);
  }
  //get venta pasando ID
  getVentaId(VentaId: number):Observable<Venta[]> {
    return this.http.get<Venta[]>(this.url_dev + 'venta/' + VentaId);
  }
  //update venta
  putVenta(formularioVenta:any, id:any): Observable<Venta[]> {
    return this.http.put<Venta[]>(this.url_dev + 'venta/' + id, formularioVenta)
  }
  //delete venta
  deleteVenta(id:number):Observable<Venta[]> {
    return this.http.delete<Venta[]>(this.url_dev + 'venta/' + id)
  }
}
