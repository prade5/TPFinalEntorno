import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(private http: HttpClient) { }

  GetTheWinner(id) {
    return this.http.get(`${environment.api_url}evaluation.php?id=${id}`);
  }

  PostWinner(data){
    debugger;
    return this.http.put(`${environment.api_url}evaluation.php`,JSON.stringify(data));
  }
}
