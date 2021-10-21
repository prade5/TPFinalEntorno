import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/components/auth/auth.guard';
import { RoleGuardGuard } from 'src/app/components/auth/role-guard.guard';
import { AplicantWinnerComponent } from 'src/app/components/competition/applicantwinner/applicantwinner.component';

const routes: Routes = [
  {
    path: '',
    component: AplicantWinnerComponent,
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    data: {
      expectedRole: 'admin',
      title: 'Declarar ganador de concurso'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AplicantWinnerRoutingModule { }
