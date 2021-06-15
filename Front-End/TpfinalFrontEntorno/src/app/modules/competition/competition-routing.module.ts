import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/components/auth/auth.guard';
import { RoleGuardGuard } from 'src/app/components/auth/role-guard.guard';
import { ActioncompetitionComponent } from 'src/app/components/competition/actioncompetition/actioncompetition.component';
import { CompetitionComponent } from 'src/app/components/competition/competition.component';

const routes: Routes = [
  {
    path: '',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: CompetitionComponent,
    data: {
      expectedRole: 'admin',
      title: 'Lista de concurso'
    }
  },
  {
    path: 'ActionCompetition/:id',
    component: ActioncompetitionComponent,
    data: {title: 'Bienvenido a los concursos'}
  },
  {
    path: 'ActionCompetition',
    component: ActioncompetitionComponent,
    data: {title: 'Bienvenido a los concursos'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetitionRoutingModule { }
