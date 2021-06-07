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

  GetAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.api_url}user.php`);
  }
  GetById(id){
    return this.http.get(`${environment.api_url}user.php?id=${id}`);
  }
  Post(role){
    return this.http.post(`${environment.api_url}user.php`,JSON.stringify(role));
  }
  Put(role){
    return this.http.put(`${environment.api_url}user.php?id=${role.id}`,JSON.stringify(role));
  }
  Delete(id){
    return this.http.delete(`${environment.api_url}user.php?id=${id}`);
  }

}
