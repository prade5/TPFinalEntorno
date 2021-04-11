import { Routes } from "@angular/router";
import { UserComponent } from "../components/user/user.component";

export const appRoutes: Routes = [
  {
    path: 'Usuario',
    component: UserComponent,
     data: {title: 'Usuario'}
  },
  {
    path: '',
    redirectTo: `/Usuario`,
    pathMatch: 'full',
  }
];
