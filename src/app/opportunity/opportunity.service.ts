import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpportunityService {

  constructor(private httpClient: HttpClient) { }

  getOpportunitySearch(token, body) {
    return this.httpClient.post<any>('/api/proxy/opportunity/get-search-object', body, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'CustomToken ' + token
      })
    });
  }

  getOpportunityById(token, id) {
    return this.httpClient.get<any>('/api/proxy/opportunity/get-by-id/' + id, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'CustomToken ' + token
      })
    });
  }

  saveOpportunity(token, body) {
    return this.httpClient.post<any>('/api/proxy/opportunity/save', body, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'CustomToken ' + token
      })
    });
  }

  deleteOpportunity(token, id) {
    return this.httpClient.delete<any>('/api/proxy/opportunity/delete/' + id, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'CustomToken ' + token
      })
    });
  }

  getLeadList(token) {
    return this.httpClient.get<any>('/api/proxy/lead/get-all', {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'CustomToken ' + token
      })
    });
  }
  
}