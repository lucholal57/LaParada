import {HttpClient ,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/entidades/producto/producto';

// Constante de los headers para los encabezados
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')}),
}


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  //Variables para las rudas dev y prod
private url_dev = 'http://127.0.0.1:8000/';

  constructor( private http: HttpClient) { }

  //get productos
  getProducto():Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url_dev + 'producto')
  }
  
}
