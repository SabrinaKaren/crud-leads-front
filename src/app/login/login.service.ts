import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  toLogin(body) {
    return this.httpClient.post<any>('/api/proxy/auth/login', body, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    });
  }

  register(body) {
    return this.httpClient.post<any>('/api/proxy/auth/new-user', body, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    });
  }

}