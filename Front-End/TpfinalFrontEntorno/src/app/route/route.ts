import { Routes } from "@angular/router";
import { HomeComponent } from "../components/home/home.component";
import { LoginComponent } from "../components/login/login.component";
import {ActioncompetitionComponent} from "../components/competition/actioncompetition/actioncompetition.component";
import {CompetitionComponent} from "../components/competition/competition.component";

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
    path: 'Competition',
    component: CompetitionComponent,
    data: {title: 'Lista de concursos'}
  },
  {
    path: 'ActionCompetition',
    component: ActioncompetitionComponent,
    data: {title: 'Acceder al ActionCompetition'}
  },
  {
    path: '',
    redirectTo: `/Home`,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/Home',
    pathMatch: 'full',
  }

];
