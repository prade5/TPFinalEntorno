import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JefedeCatedraMateria } from '../../classes/jefedecatedra_materia';
import { environment } from '../../../environments/environment';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class JefecatedraService {

  public folderName:string = 'JefeDeCatedraMateria/';

  constructor(private http: HttpClient) { }
  GetAll(idUser): Observable<JefedeCatedraMateria[]> {
    return this.http.get<JefedeCatedraMateria[]>(`${environment.api_url}${this.folderName}get.php?idUser=${idUser}`);
   }
   GetAllByAdmin(idSubject): Observable<any[]> {
    return this.http.get<JefedeCatedraMateria[]>(`${environment.api_url}${this.folderName}getAllByAdmin.php?jcmadmin=${idSubject}`);
   }
   GetById(id){
     return this.http.get(`${environment.api_url}${this.folderName}getById.php?id=${id}`);
   }
   Post(data){
     return this.http.post(`${environment.api_url}${this.folderName}post.php`, JSON.stringify(data));
   }
   Put(data){
     return this.http.post(`${environment.api_url}${this.folderName}update.php?id=${data.Id}`,JSON.stringify(data));
   }
   Delete(id){
     return this.http.post(`${environment.api_url}${this.folderName}delete.php?id=${id}`, JSON.stringify(id));
   }
}
