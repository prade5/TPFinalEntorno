import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Knowlageuser } from '../../classes/knowlageusers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KownlageService {

  public folderName:string = 'KnowlageUser/';

  constructor(private http: HttpClient) { }
  GetAll(idUser): Observable<Knowlageuser[]> {
    return this.http.get<Knowlageuser[]>(`${environment.api_url}${this.folderName}get.php?idUser=${idUser}`);
  }
  GetById(id){
    return this.http.get(`${environment.api_url}${this.folderName}getById.php?id=${id}`);
  }
  Post(data){
    return this.http.post(`${environment.api_url}${this.folderName}post.php`,JSON.stringify(data));
  }
  Put(data){
    return this.http.post(`${environment.api_url}${this.folderName}update.php?id=${data.id}`,JSON.stringify(data));
  }
  Delete(id){
    return this.http.post(`${environment.api_url}${this.folderName}delete.php?id=${id}`,JSON.stringify(id));
  }
}
