import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../classes/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public folderName:string = 'User/';

  constructor(private http: HttpClient) { }

  GetAll(isAdmin = false): Observable<User[]> {
    return this.http.get<User[]>(`${environment.api_url}${this.folderName}get.php?jcm=${isAdmin}`);
  }
  ValidateRolePostulation(iduser): Observable<User[]> {
    return this.http.get<User[]>(`${environment.api_url}${this.folderName}confirmRegister.php?isValPostulate=${iduser}`);
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
  ChangeRole(data){
    return this.http.post(`${environment.api_url}${this.folderName}updateUserRole.php?changeRole=${data.id}`,JSON.stringify(data));
  }
  Delete(id){
    return this.http.post(`${environment.api_url}${this.folderName}delete.php?id=${id}`,JSON.stringify(id));
  }

}
