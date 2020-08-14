import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  constructor(private httpClient: HttpClient) { }

  getLeadSearch(token, nameContains) {
    return this.httpClient.get<any>('/api/proxy/lead/get-by-name/' + nameContains, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'CustomToken ' + token
      })
    });
  }

  getLeadById(token, id) {
    return this.httpClient.get<any>('/api/proxy/lead/get-by-id/' + id, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'CustomToken ' + token
      })
    });
  }

  saveLead(token, body) {
    return this.httpClient.post<any>('/api/proxy/lead/save', body, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'CustomToken ' + token
      })
    });
  }

  deleteLead(token, id) {
    return this.httpClient.delete<any>('/api/proxy/lead/delete/' + id, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'CustomToken ' + token
      })
    });
  }

  getStatusList(token) {
    return this.httpClient.get<any>('/api/proxy/status/get-all', {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'CustomToken ' + token
      })
    });
  }
  
}