import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Client } from './client';
import { Creator } from './creator';

const BASE_URL = 'https://localhost:7053/api/';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) {
  }
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${BASE_URL}clients`);
  }

  getCreators(): Observable<Creator[]> {
    return this.http.get<Creator[]>(`${BASE_URL}clients/creators`);
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${BASE_URL}clients/${id}`);
  }
  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${BASE_URL}clients`, client);
  }
  updateClient(client: Client): Observable<any> {
    return this.http.put<any>(`${BASE_URL}clients`, client);
  }
  deleteClient(id: number): Observable<any> {
    return this.http.delete<any>(`${BASE_URL}clients/${id}`);
  }
  getUnvaccinatedClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${BASE_URL}Clients/unvaccinated`);
  }
};