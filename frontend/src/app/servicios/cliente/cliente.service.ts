import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../../entidades/cliente/cliente';

// Constante de los headers para los encabezados con TOKEN de Autorizacion
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')}),
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  //Variables para las rudas dev y prod
private url_dev = 'http://127.0.0.1:8000/';
private url_prod = 'http://192.168.17.201:8080/';

  constructor( private http: HttpClient) { }

  //get Cliente
  getCliente():Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url_prod + 'cliente')
  }
  //get cliente pasando ID
  getClienteId(clienteId:number):Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url_prod + 'cliente/'+ clienteId)
  }
  //post Cliente
  postCliente(formularioCliente:any):Observable<Cliente[]> {
    return this.http.post<Cliente[]>(this.url_prod + 'cliente', formularioCliente)
  }
  //update Cliente
  putCliente(formularioCliente:any,id:any):Observable<Cliente[]> {
    return this.http.put<Cliente[]>(this.url_prod + 'cliente/' + id, formularioCliente)
  }
  //delete Cliente
  deleteCliente(id:any):Observable<Cliente[]>{
    return this.http.delete<Cliente[]>(this.url_prod + 'cliente/' + id)
  }

}
