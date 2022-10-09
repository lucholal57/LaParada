import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // Variable para la url
  private url = 'http://127.0.0.1:8000/';

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  login(user: any): Observable<any> {
    return this.http.post(this.url + 'account/login/', user);
  }

}
