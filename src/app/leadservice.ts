import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  constructor(private http: HttpClient) { }

  getLeads(page: number, size: number) {
    return this.http.get(
      `${environment.apiUrl}/api/leads?page=${page}&size=${size}`
    );
  }
}