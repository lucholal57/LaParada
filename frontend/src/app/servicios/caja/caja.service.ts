import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Constante de los headers para los encabezados con TOKEN de Autorizacion
const httpOption = {
  headers: new HttpHeaders({ 'content-type' : 'application/json',
                              'Authorization' : 'Token' +" "+ localStorage.getItem('token')}),
}

@Injectable({
  providedIn: 'root'
})
export class CajaService {
    //Variables para las rudas dev y prod
private url_dev = 'http://127.0.0.1:8000/';
private url_prod = 'http://192.168.0.100:8080/';

  constructor(private http: HttpClient) { }

  getCaja():Observable<any> {
    return this.http.get<any>(this.url_dev + 'caja', httpOption );
  }

  postCaja(total:any):Observable<any>{
    return this.http.post<any>(this.url_dev + 'caja', total, httpOption);
  }
}
