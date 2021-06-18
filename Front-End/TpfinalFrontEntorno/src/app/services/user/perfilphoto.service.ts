import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerfilPhoto } from '../../classes/perfilphoto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilphotoService {

  constructor(private http: HttpClient) { }
  GetAll(): Observable<PerfilPhoto[]> {
    return this.http.get<PerfilPhoto[]>(`${environment.api_url}perfilphoto.php`);
  }
  GetById(id){
    return this.http.get(`${environment.api_url}perfilphoto.php?id=${id}`);
  }
}
