import { Routes } from "@angular/router";
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
    path: 'ActionUser',
    component: ActionuserComponent,
    data: {title: 'Acción usuario'}
  }
];
