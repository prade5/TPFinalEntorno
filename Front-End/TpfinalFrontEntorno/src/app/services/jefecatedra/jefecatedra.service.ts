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
   // Delete(id){
   //   const params = new HttpParams()
   //     .set('id', id.toString());
   //
   //   return this.http.delete(`${environment.api_url}jefedecatedraDelete.php`, { params: params } ).subscribe();
   // }
  Delete(id){
    const params = new HttpParams()
      .set('id', id.toString());

    return this.http.post(`${environment.api_url}jefedecatedraDelete.php`, JSON.stringify(id));
  }
}
