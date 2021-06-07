import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competition } from '../../classes/competition';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(private http: HttpClient) { }

  GetAll(): Observable<Competition[]> {
   return this.http.get<Competition[]>(`${environment.api_url}competition.php`);
  }
  GetById(id){
    return this.http.get(`${environment.api_url}competition.php?id=${id}`);
  }
  Post(role){
    return this.http.post(`${environment.api_url}competition.php`,JSON.stringify(role));
  }
  Put(role){
    return this.http.put(`${environment.api_url}competition.php?id=${role.id}`,JSON.stringify(role));
  }
  Delete(id){
    return this.http.delete(`${environment.api_url}competition.php?id=${id}`);
  }

}
