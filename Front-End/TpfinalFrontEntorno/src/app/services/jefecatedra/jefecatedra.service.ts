import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JefedeCatedraMateria } from '../../classes/jefedecatedra_materia';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JefecatedraService {

  constructor(private http: HttpClient) { }
  GetAll(idUser): Observable<JefedeCatedraMateria[]> {
    return this.http.get<JefedeCatedraMateria[]>(`${environment.api_url}jefedecatedramateria.php?idUser=${idUser}`);
   }
   GetAllByAdmin(idSubject): Observable<any[]> {
    return this.http.get<JefedeCatedraMateria[]>(`${environment.api_url}jefedecatedramateria.php?jcmadmin=${idSubject}`);
   }
   GetById(id){
     return this.http.get(`${environment.api_url}jefedecatedramateria.php?id=${id}`);
   }
   Post(data){
     return this.http.post(`${environment.api_url}jefedecatedramateria.php`, JSON.stringify(data));
   }
   Put(data){
     return this.http.put(`${environment.api_url}jefedecatedramateria.php?id=${data.Id}`,JSON.stringify(data));
   }
   Delete(id){
     return this.http.delete(`${environment.api_url}jefedecatedramateria.php?id=${id}`);
   }
}
