import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 private urlBase ="http://localhost:8080/TPFinal/TPFinalEntorno/Back-End/Users/";
  constructor(private http: HttpClient) { }

  GetAll(): Observable<User[]> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');

   return this.http.get<User[]>(`${this.urlBase}List.php`, {headers: headers});
  }
}
