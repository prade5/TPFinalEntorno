import { Routes } from "@angular/router";
import { HomeComponent } from "../components/home/home.component";
import { LoginComponent } from "../components/login/login.component";
import {ActioncompetitionComponent} from "../components/competition/actioncompetition/actioncompetition.component";
import {CompetitionComponent} from "../components/competition/competition.component";
import { AplicantComponent } from "../components/aplicant/aplicant/aplicant.component";
import { ErrorComponent } from "../components/error/error.component";
import { UserComponent } from "../components/user/user.component";
import { ActionuserComponent } from "../components/user/actionuser/actionuser.component";

export const appRoutes: Routes = [
  {
    path: 'MenuAdmin',
    loadChildren:() => import('../modules/menuprincipale/menuprincipal.module').then((u) => u.MenuprincipalModule)
  },
  {
    path: 'Home',
    component: HomeComponent,
     data: {title: 'Bienvenido al Siste de concurso'}
  },
  {
    path: 'Account',
    component: LoginComponent,
     data: {title: 'Acceder al sistema'}
  },
  {
    path: 'Register',
    component: ActionuserComponent,
    data: {title: 'Registrar usuario'}
  },
  // {
  //   path: 'ActionCompetition',
  //   component: ActioncompetitionComponent,
  //   data: {title: 'Acceder al ActionCompetition'}
  // },
  // {
  //   path:'Postulantes',
  //   component:AplicantComponent,
  //   data: {title: 'Lista de postulantes'}
  // },
  {
    path: '',
    redirectTo: `/Home`,
    pathMatch: 'full',
  },
  {
    path: 'Error',
    component:ErrorComponent,
    data: {title: 'Error: Sistema de concurso'}
  },
  {
    path: '**',
    redirectTo: '/Home',
    pathMatch: 'full',
  }

];
