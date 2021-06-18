import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Applicant } from 'src/app/classes/applicant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  constructor(private http: HttpClient) { }

  GetAll(): Observable<Applicant[]> {
    return this.http.get<Applicant[]>(`${environment.api_url}applicant.php`);
  }
  
}
