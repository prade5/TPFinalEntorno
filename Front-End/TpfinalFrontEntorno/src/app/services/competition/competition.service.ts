import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competition } from '../../classes/competition';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  public folderName:string = 'Competition/';

  constructor(private http: HttpClient) { }

  GetAll(role:boolean, iduser:number): Observable<Competition[]> {
   return this.http.get<any[]>(`${environment.api_url}${this.folderName}get.php?isAdmin=${role}&idAdmin=${iduser}`);
  }
  GetAllPostulation(iduser): Observable<Competition[]> {
    debugger;
    return this.http.get<Competition[]>(`${environment.api_url}${this.folderName}getAllPostulation.php?iduser=${iduser}`);
   }
  GetByUserId(id): Observable<Competition> {
    debugger;
    return this.http.get<Competition>(`${environment.api_url}${this.folderName}getByUserId.php?idu=${id}`);
  }
  GetById(id): Observable<Competition>{
    return this.http.get<Competition>(`${environment.api_url}${this.folderName}getById.php?id=${id}`);
  }
  GetDetail(id): Observable<Competition>{
    return this.http.get<Competition>(`${environment.api_url}${this.folderName}getDetail.php?id=${id}`);
  }
  Post(competition){
    return this.http.post(`${environment.api_url}${this.folderName}post.php`, JSON.stringify(competition));
  }
  Put(competition){
    return this.http.post(`${environment.api_url}${this.folderName}update.php?id=${competition.id}`,JSON.stringify(competition));
  }
  Delete(id){
    return this.http.post(`${environment.api_url}${this.folderName}delete.php?id=${id}`, JSON.stringify(id));
  }
  DeclareWinner(idComp, idUser){
    return this.http.post(`${environment.api_url}${this.folderName}declareWinner.php?idComp=${idComp}&idUser=${idUser}`, JSON.stringify(idComp, idUser));
  }

}
