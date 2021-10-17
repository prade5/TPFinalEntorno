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
  GetAllPostulation(iduser): Observable<Competition[]> {
    return this.http.get<Competition[]>(`${environment.api_url}competition.php?iduser=${iduser}`);
   }
  GetByUserId(id): Observable<Competition> {
    debugger;
    return this.http.get<Competition>(`${environment.api_url}competition.php?idu=${id}`);
  }
  GetById(id): Observable<Competition>{
    return this.http.get<Competition>(`${environment.api_url}competition.php?id=${id}`);
  }
  Post(competition){
    return this.http.post(`${environment.api_url}competition.php`, JSON.stringify(competition));
  }
  Put(competition){
    return this.http.put(`${environment.api_url}competition.php?id=${competition.id}`,JSON.stringify(competition));
  }
  Delete(id){
    return this.http.delete(`${environment.api_url}competition.php?id=${id}`);
  }
  DeclareWinner(idComp, idUser){
    return this.http.put(`${environment.api_url}competition.php?idComp=${idComp}&idUser=${idUser}`, JSON.stringify(idComp, idUser));
  }

}
