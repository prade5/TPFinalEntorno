import { Routes } from "@angular/router";
import { AdminComponent } from "../components/admin/admin.component";
import { AuthGuard } from "../components/auth/auth.guard";
import { RoleGuardGuard } from "../components/auth/role-guard.guard";
import { CompetitionComponent } from "../components/competition/competition.component";
import { HomeComponent } from "../components/home/home.component";
import { LoginComponent } from "../components/login/login.component";
import { MenuadminComponent } from "../components/menu/menuadmin/menuadmin.component";
import { PrincipalComponent } from "../components/menu/principal/principal.component";
import { ActionroleComponent } from "../components/role/actionrole/actionrole.component";
import { RoleComponent } from "../components/role/role.component";
import {ActioncompetitionComponent} from "../components/competition/actioncompetition/actioncompetition.component";

export const appRoutes: Routes = [
  {
    path: 'User',
    loadChildren:() => import("../modules/user/user.module").then((p) => p.UserModule)
    // component: UserComponent,
    //  data: {title: 'Usuario'}
  },
  {
    path: '',
    redirectTo: `/Home`,
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
    path: 'MenuAdmin',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: MenuadminComponent,
     data: {
      expectedRole: 'admin',
       title: 'Acceder permiso'
      }
  },
  // {
  //   path: 'ActionUser',
  //   canLoad: [AuthGuard],
  //   canActivate: [RoleGuardGuard],
  //   component: ActionuserComponent,
  //   data: {
  //     expectedRole: 'admin',
  //     title: 'Acción usuario'
  //   }
  // },
  {
    path: 'Competition',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: CompetitionComponent,
    data: {
      expectedRole: 'admin',
      title: 'Acción usuario'
    }
  },
  {
    path: 'ActionCompetition',
    component: ActioncompetitionComponent,
    data: {title: 'Bienvenido a los concursos'}
  }
];
