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

  GetAllByComp(idComp): Observable<Applicant[]>{
    return this.http.get<Applicant[]>(`${environment.api_url}applicant.php?idComp=${idComp}`)
  }

  Post(applicant){
    return this.http.post(`${environment.api_url}applicant.php`, JSON.stringify(applicant));
  }

  Put(data){
    return this.http.put(`${environment.api_url}applicant.php?id=${data.id}`,JSON.stringify(data));
  }

}
