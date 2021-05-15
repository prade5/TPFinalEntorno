import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import { TaskService } from '../../services/auth/task.service';
import {AuthService} from '../../services/auth/auth.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {

  constructor(public auth: TaskService, public router: Router,
    public autisAut:AuthService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    debugger;
    if (!this.autisAut.isAuthenticated() || decode(this.auth.getJwtToken())['role'].toLowerCase() !== route.data.expectedRole) {
      this.router.navigate(['Account']);
      return false;
    }
    return true;
  }

}
