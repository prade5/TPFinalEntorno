import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '../../classes/document';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumenttypeService {
  private urlBase = environment.api_url;
  constructor(private http: HttpClient) { }

  GetAll(): Observable<Document[]> {
   return this.http.get<Document[]>(`${this.urlBase}document.php`);
  }
  GetById(id){
    return this.http.get(`${this.urlBase}document.php?id=${id}`);
  }
  Post(role){
    return this.http.post(`${this.urlBase}document.php`,JSON.stringify(role));
  }
  Put(role){
    return this.http.put(`${this.urlBase}document.php?id=${role.id}`,JSON.stringify(role));
  }
  Delete(id){
    return this.http.delete(`${this.urlBase}document.php?id=${id}`);
  }

}
