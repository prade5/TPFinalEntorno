import { Routes } from "@angular/router";
import { LoginComponent } from "../components/login/login.component";
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
    redirectTo: `/User`,
    pathMatch: 'full',
  },
  {
    path: 'Role',
    component: RoleComponent,
     data: {title: 'Permiso'}
  },
  {
    path: 'ActionRole',
    component: ActionroleComponent,
     data: {title: 'Acceder permiso'}
  },
  {
    path: 'Account',
    component: LoginComponent,
     data: {title: 'Acceder al sistema'}
  },
  {
    path: 'ActionRole/:id',
    component: ActionroleComponent,
     data: {title: 'Acceder permiso'}
  },
  {
    path: 'ActionUser',
    component: ActionuserComponent,
    data: {title: 'Acción usuario'}
  }
];
