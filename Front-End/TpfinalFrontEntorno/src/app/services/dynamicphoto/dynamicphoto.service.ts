import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo } from '../../classes/photo';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DynamicphotoService {

  constructor(private http: HttpClient) { }
  GetAll(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${environment.api_url}photo.php`);
   }  
 
}
