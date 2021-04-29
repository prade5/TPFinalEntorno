import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../../classes/role';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private urlBase = environment.api_url;
  constructor(private http: HttpClient) { }

  GetAll(): Observable<Role[]> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');

   return this.http.get<Role[]>(`${this.urlBase}role.php`, {headers: headers});
  }
  GetById(id){
    return this.http.get(`${this.urlBase}role.php?id=${id}`);
  }
  Post(role){
    return this.http.post(`${this.urlBase}role.php`,JSON.stringify(role));
  }
  Put(role){
    return this.http.put(`${this.urlBase}role.php?id=${role.id}`,JSON.stringify(role));
  }
  Delete(role){
    return this.http.delete(`${this.urlBase}role.php?id=${role.id}`);
  }
}
