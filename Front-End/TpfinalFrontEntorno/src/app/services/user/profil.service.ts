import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfilUser } from '../../classes/profiluser';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http: HttpClient) { }
  GetAll(): Observable<ProfilUser[]> {
    return this.http.get<ProfilUser[]>(`${environment.api_url}perfiluser.php`);
  }
  GetById(id){
    return this.http.get(`${environment.api_url}perfiluser.php?id=${id}`);
  }
  Post(data){
    return this.http.post(`${environment.api_url}perfiluser.php`,JSON.stringify(data));
  }
  Put(data){
    debugger;
    return this.http.put(`${environment.api_url}perfiluser.php?id=${data.id}`,JSON.stringify(data));
  }
  Delete(id){
    return this.http.delete(`${environment.api_url}perfiluser.php?id=${id}`);
  }
}
