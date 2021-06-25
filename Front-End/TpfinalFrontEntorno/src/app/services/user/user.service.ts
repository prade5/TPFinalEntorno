import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../classes/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  GetAll(isAdmin = false): Observable<User[]> {
    return this.http.get<User[]>(`${environment.api_url}user.php?jcm=${isAdmin}`);
  }
  ValidateRolePostulation(iduser): Observable<User[]> {
    return this.http.get<User[]>(`${environment.api_url}user.php?isValPostulate=${iduser}`);
  }

  GetById(id){
    return this.http.get(`${environment.api_url}user.php?id=${id}`);
  }
  Post(data){
    return this.http.post(`${environment.api_url}user.php`,JSON.stringify(data));
  }
  Put(data){
    debugger;
    return this.http.put(`${environment.api_url}user.php?id=${data.id}`,JSON.stringify(data));
  }
  Delete(id){
    return this.http.delete(`${environment.api_url}user.php?id=${id}`);
  }

}
