import { Routes } from "@angular/router";
import { AuthGuard } from "../components/auth/auth.guard";
import { RoleGuardGuard } from "../components/auth/role-guard.guard";
import { HomeComponent } from "../components/home/home.component";
import { LoginComponent } from "../components/login/login.component";
import { PrincipalComponent } from "../components/menu/principal/principal.component";
import { ActionroleComponent } from "../components/role/actionrole/actionrole.component";
import { RoleComponent } from "../components/role/role.component";
import { ActionuserComponent } from "../components/user/actionuser/actionuser.component";
import { UserComponent } from "../components/user/user.component";

export const appRoutes: Routes = [
  {
    path: 'User',
    component: UserComponent,
     data: {title: 'Usuario'}
  },
  {
    path: '',
    redirectTo: `/Account`,
    pathMatch: 'full',
  },
  {
    path: 'Role',
    component: RoleComponent,
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'admin',
      title: 'Permiso'
    }
  },
  {
    path: 'ActionRole',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: ActionroleComponent,
     data: {
      expectedRole: 'admin',
       title: 'Acceder permiso'
      }
  },
  {
    path: 'Principal',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: PrincipalComponent,
     data: {
      expectedRole: 'admin',
       title: 'Menu principal'
      }
  },
  {
    path: 'Account',
    component: LoginComponent,
     data: {title: 'Acceder al sistema'}
  },
  {
    path: 'Home',
    component: HomeComponent,
     data: {title: 'Bienvenido al Siste de concurso'}
  },
  {
    path: 'ActionRole/:id',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: ActionroleComponent,
     data: {
      expectedRole: 'admin',
       title: 'Acceder permiso'
      }
  },
  {
    path: 'ActionUser',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: ActionuserComponent,
    data: {
      expectedRole: 'admin',
      title: 'Acción usuario'
    }
  }
];
