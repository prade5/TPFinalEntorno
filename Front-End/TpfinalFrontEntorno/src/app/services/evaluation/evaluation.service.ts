import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  public folderName:string = 'Evaluation/';

  constructor(private http: HttpClient) { }

  GetTheWinner(id) {
    return this.http.get(`${environment.api_url}${this.folderName}getTheWinner.php?id=${id}`);
  }

  PostWinner(data){
    debugger;
    return this.http.post(`${environment.api_url}${this.folderName}youWin.php`,JSON.stringify(data));
  }
}
