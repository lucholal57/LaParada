import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';


// Constante de los headers para los encabezados con TOKEN de Autorizacion
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')}),
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public userRole="";
  public onUserRoleChange: EventEmitter<string> = new EventEmitter();

  // Variable para la url
  private url_dev = 'http://127.0.0.1:8000/';
  private url_prod = 'http://192.168.0.100:8080/';

  //Variable user

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  login(user: any): Observable<any> {
    return this.http.post(this.url_prod + 'account/login/', user);
  }

  getUsuarioporToken(): Observable<any> {
    return this.http.get(this.url_prod + 'account/user/', httpOption)
  }

}
