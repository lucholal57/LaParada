import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/entidades/producto/producto';

// Constante de los headers para los encabezados con TOKEN de Autorizacion
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

  //get Producto
  getProducto():Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url_dev + 'producto');
  }
  //post producto
  postProducto(formularioRegistro:any):Observable<Producto[]> {
    return this.http.post<Producto[]>(this.url_dev + 'producto', formularioRegistro);
  }
  //get producto pasando ID
  getProductoId(productoId: number):Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url_dev + 'producto/' + productoId);
  }
  //update producto
  putProducto(formularioRegistro:any, id:any): Observable<Producto[]> {
    return this.http.put<Producto[]>(this.url_dev + 'producto/' + id, formularioRegistro)
  }
  //delete producto
  deleteProducto(id:number):Observable<Producto[]> {
    return this.http.delete<Producto[]>(this.url_dev + 'producto/' + id)
  }
  //get producto pasando Serie
  getProductoSerie(buscarSerie: number):Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url_dev + 'producto/serie/' + buscarSerie);
  }
}
