import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AplicantComponent } from 'src/app/components/aplicant/aplicant/aplicant.component';
import { AuthGuard } from 'src/app/components/auth/auth.guard';
import { RoleGuardGuard } from 'src/app/components/auth/role-guard.guard';

const routes: Routes = [  
  {
    path: '',
    component: AplicantComponent,
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
     data: {
      expectedRole: 'admin',
      title: 'Lista de Postulantes'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AplicantRoutingModule { }
