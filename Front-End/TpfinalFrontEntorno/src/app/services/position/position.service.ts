import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Position} from "../../classes/position";

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private urlBase = environment.api_url;
  constructor(private http: HttpClient) { }

  GetAll(): Observable<Position[]> {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http.get<Position[]>(`${this.urlBase}position.php`, {headers: headers});
  }

  GetById(id){
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http.get(`${environment.api_url}position.php?id=${id}`, {headers: headers});
  }

}
