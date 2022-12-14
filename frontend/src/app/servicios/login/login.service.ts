import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // Variable para la url
  private url_dev = 'http://127.0.0.1:8000/';
  private url_prod = 'http://192.168.0.100:8080/';

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  login(user: any): Observable<any> {
    return this.http.post(this.url_prod + 'account/login/', user);
  }

}
