import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../../classes/subject';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  GetAll(): Observable<Subject[]> {
    // const headers = new HttpHeaders();
    // headers.append('Access-Control-Allow-Headers', 'Content-Type');
    // headers.append('Access-Control-Allow-Methods', 'GET');
    // headers.append('Access-Control-Allow-Origin', '*');
    // , {headers: headers}
   return this.http.get<Subject[]>(`${environment.api_url}subject.php`);
  }
  GetById(id){
    return this.http.get(`${environment.api_url}subject.php?id=${id}`);
  }
  Post(role){
    return this.http.post(`${environment.api_url}subject.php`,JSON.stringify(role));
  }
  Put(role){
    return this.http.put(`${environment.api_url}subject.php?id=${role.id}`,JSON.stringify(role));
  }
  Delete(id){
    return this.http.delete(`${environment.api_url}subject.php?id=${id}`);
  }
}
