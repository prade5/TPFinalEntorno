import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Knowlageuser } from '../../classes/knowlageusers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KownlageService {

  constructor(private http: HttpClient) { }
  GetAll(idUser): Observable<Knowlageuser[]> {
    return this.http.get<Knowlageuser[]>(`${environment.api_url}knowlageuser.php?idUser=${idUser}`);
  }
  GetById(id){
    return this.http.get(`${environment.api_url}knowlageuser.php?id=${id}`);
  }
  Post(data){
    return this.http.post(`${environment.api_url}knowlageuser.php`,JSON.stringify(data));
  }
  Put(data){
    debugger;
    return this.http.put(`${environment.api_url}knowlageuser.php?id=${data.id}`,JSON.stringify(data));
  }
  Delete(id){
    return this.http.delete(`${environment.api_url}knowlageuser.php?id=${id}`);
  }
}
