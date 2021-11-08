import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerfilPhoto } from '../../classes/perfilphoto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilphotoService {

  public folderName:string = 'PerfilPhoto/';

  constructor(private http: HttpClient) { }
  GetAll(): Observable<PerfilPhoto[]> {
    return this.http.get<PerfilPhoto[]>(`${environment.api_url}${this.folderName}get.php`);
  }
  GetById(id){
    return this.http.get(`${environment.api_url}${this.folderName}getById.php?id=${id}`);
  }
}
