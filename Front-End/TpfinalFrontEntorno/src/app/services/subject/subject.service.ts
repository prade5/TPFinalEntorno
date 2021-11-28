import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../../classes/subject';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  public folderName:string = 'Subject/';

  constructor(private http: HttpClient) { }

  GetAll(): Observable<Subject[]> {
    debugger;
   return this.http.get<Subject[]>(`${environment.api_url}${this.folderName}get.php`);
  }
  GetByUserId(id): Observable<Subject[]> {
    debugger;
    return this.http.get<Subject[]>(`${environment.api_url}${this.folderName}getByUserId.php?idu=${id}`);
  }
  GetById(id){
    return this.http.get(`${environment.api_url}${this.folderName}getById.php?id=${id}`);
  }
  Post(subject){
    return this.http.post(`${environment.api_url}${this.folderName}post.php`,JSON.stringify(subject));
  }
  Put(subject){
    return this.http.post(`${environment.api_url}${this.folderName}update.php?id=${subject.id}`,JSON.stringify(subject));
  }
  Delete(id){
    return this.http.post(`${environment.api_url}${this.folderName}delete.php?id=${id}`,JSON.stringify(id));
  }
}
