import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import {Tokens} from '../../classes/Tokens';
import { Auth } from '../../classes/auth';
import { tap, mapTo, catchError } from 'rxjs/operators';
import { Constant } from '../../classes/constant';
import decode from 'jwt-decode';
import { LoadscriptService } from '../loadScript/loadscript.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private urlBase = environment.api_url;

  public folderName:string = 'Auth/';

  constructor(private http: HttpClient, private loadscript: LoadscriptService) { }
  Authentication(auth:Auth): Observable<boolean>{
    this.doLogoutUser();
    return this.http.post<any>(`${this.urlBase}${this.folderName}post.php`, JSON.stringify(auth))
    .pipe(
      tap( tokens =>{
        if (tokens.response.status !== 400) {
          this.doLoginUser(auth.userName, tokens.response.message)
        } else {
          throw tokens;
        }
      } ),
      mapTo(true),
      catchError(error => {
        throw error;
      })
    );
  }

  Put(data){
    return this.http.post(`${environment.api_url}${this.folderName}update.php?id=${data.id}`,JSON.stringify(data));
  }

  loggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(Constant.JWT_TOKEN);
  }

  public GetRole() {
    return this.loadscript.Decrypt(localStorage.getItem(Constant.roleUser));
  }
  public GetIspostulateOut() {
    const IspostulateOut =localStorage.getItem(Constant.IspostulateOut);
    return IspostulateOut!= null ? parseInt(this.loadscript.Decrypt(IspostulateOut)): null;
  }
  public RemoveIspostulateOut() {
    return localStorage.removeItem(Constant.IspostulateOut);
  }
  public GetIdUser() {
    return parseInt(this.loadscript.Decrypt(localStorage.getItem(Constant.idUser)));
  }
  public GetUserName() {
    return this.loadscript.Decrypt(localStorage.getItem(Constant.loggedUser));
  }
  public Logout(){
    this.removeTokens();
    localStorage.removeItem(Constant.IspostulateOut);
    return true;
  }
  private removeTokens() {
    localStorage.removeItem(Constant.idUser);
    localStorage.removeItem(Constant.idRole);
    localStorage.removeItem(Constant.roleUser);
    localStorage.removeItem(Constant.JWT_TOKEN);
    localStorage.removeItem(Constant.loggedUser);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    localStorage.setItem(Constant.loggedUser, this.loadscript.Encrypt(username));
    this.storeTokens(tokens);
  }

  public doLogoutUser() {
    this.removeTokens();
  }

  private storeTokens(tokens: Tokens) {
    debugger;
    let decodotken = decode(tokens.jwt);
    localStorage.setItem(Constant.idUser, this.loadscript.Encrypt(decodotken['userId']));
    localStorage.setItem(Constant.idRole, this.loadscript.Encrypt(decodotken['idRole']));
    localStorage.setItem(Constant.roleUser, this.loadscript.Encrypt(decodotken['role']));
    localStorage.setItem(Constant.JWT_TOKEN, tokens.jwt);
  }

}
