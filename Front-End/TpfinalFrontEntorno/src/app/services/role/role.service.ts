import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../../classes/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private urlBase ="http://localhost:8080/TPFinal/TPFinalEntorno/Back-End/Role/";
  constructor(private http: HttpClient) { }

  GetAll(): Observable<Role[]> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');

   return this.http.get<Role[]>(`${this.urlBase}List.php`, {headers: headers});
  }

  Post(role){
    return this.http.post(`${this.urlBase}Create.php`,JSON.stringify(role));
  }
}
