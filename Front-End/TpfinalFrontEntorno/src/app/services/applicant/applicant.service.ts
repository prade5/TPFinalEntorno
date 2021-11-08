import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Applicant } from 'src/app/classes/applicant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  public folderName:string = 'Applicant/';

  constructor(private http: HttpClient) { }

  GetAll(): Observable<Applicant[]> {
    return this.http.get<Applicant[]>(`${environment.api_url}${this.folderName}get.php`);
  }

  GetAllByComp(idComp): Observable<Applicant[]>{
    return this.http.get<Applicant[]>(`${environment.api_url}${this.folderName}getAllByComp.php?idComp=${idComp}`)
  }

  Post(applicant){
    return this.http.post(`${environment.api_url}${this.folderName}post.php`, JSON.stringify(applicant));
  }

  Put(data){
    return this.http.post(`${environment.api_url}${this.folderName}update.php?id=${data.id}`,JSON.stringify(data));
  }

}
