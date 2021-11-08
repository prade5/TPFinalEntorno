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

  public folderName:string = 'role/';

  constructor(private http: HttpClient) { }

  GetAll(): Observable<Role[]> {
   return this.http.get<Role[]>(`${this.urlBase}${this.folderName}get.php`);
  }
  GetById(id){
    return this.http.get(`${this.urlBase}${this.folderName}getById.php?id=${id}`);
  }
  Post(role){
    return this.http.post(`${this.urlBase}${this.folderName}post.php`,JSON.stringify(role));
  }
  Put(role){
    return this.http.post(`${this.urlBase}${this.folderName}update.php?id=${role.id}`,JSON.stringify(role));
  }
  Delete(id){
    return this.http.post(`${this.urlBase}${this.folderName}delete.php?id=${id}`, JSON.stringify(id));
  }
}
