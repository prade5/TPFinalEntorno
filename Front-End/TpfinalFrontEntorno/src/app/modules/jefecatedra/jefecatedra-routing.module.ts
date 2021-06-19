import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/components/auth/auth.guard';
import { RoleGuardGuard } from 'src/app/components/auth/role-guard.guard';
import { ActionjefecatedraComponent } from 'src/app/components/jefecatedra/actionjefecatedra/actionjefecatedra.component';
import { JefecatedraComponent } from 'src/app/components/jefecatedra/jefecatedra/jefecatedra.component';

const routes: Routes = [
  {
    path: '',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: JefecatedraComponent,
     data: {
      expectedRole: 'admin',
       title: 'Jefe de catedra'
      }
  },
  {
    path: 'ActionJefeCatedra',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: ActionjefecatedraComponent,
     data: {
      expectedRole: 'admin',
       title: 'Accion jefe de catedra'
      }
  },
  {
    path: 'ActionJefeCatedra/:id',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: ActionjefecatedraComponent,
     data: {
      expectedRole: 'admin',
       title: 'Accion  jefe de catedra'
      }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JefecatedraRoutingModule { }
