import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfilUser } from '../../classes/profiluser';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  public folderName:string = 'PerfilUser/';

  constructor(private http: HttpClient) { }
  GetAll(): Observable<ProfilUser[]> {
    return this.http.get<ProfilUser[]>(`${environment.api_url}${this.folderName}get.php`);
  }
  GetById(id){
    return this.http.get(`${environment.api_url}${this.folderName}getById.php?id=${id}`);
  }
  Post(data){
    return this.http.post(`${environment.api_url}${this.folderName}post.php`,JSON.stringify(data));
  }
  Put(data){
    debugger;
    return this.http.post(`${environment.api_url}${this.folderName}update.php?id=${data.id}`,JSON.stringify(data));
  }
  Delete(id){
    return this.http.post(`${environment.api_url}${this.folderName}delete.php?id=${id}`,JSON.stringify(id));
  }
}
