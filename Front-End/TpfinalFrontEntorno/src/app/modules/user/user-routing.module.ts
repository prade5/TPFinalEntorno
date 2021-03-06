import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/components/auth/auth.guard';
import { RoleGuardGuard } from 'src/app/components/auth/role-guard.guard';
import { ChangePassComponent } from 'src/app/components/change-pass/change-pass.component';
import { ActionuserComponent } from 'src/app/components/user/actionuser/actionuser.component';
import { PerfilComponent } from 'src/app/components/user/perfil/perfil.component';
import { UserComponent } from 'src/app/components/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
     data: {
      expectedRole: 'admin',
      title: 'Lista de usuario'
    }
  },
  {
    path: 'ActionUser',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: ActionuserComponent,
     data: {
      expectedRole: 'admin',
       title: 'Accion usuario'
      }
  },
  {
    path: 'ActionUser/:id',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: ActionuserComponent,
     data: {
      expectedRole: 'admin',
       title: 'Accion usuario'
      }
  },
  {
    path: 'perfil/:id',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: PerfilComponent,
     data: {
      expectedRole: 'admin',
       title: 'Accion usuario'
      }
  },
  {
    path: 'ChangePassWord',
    canLoad: [AuthGuard],
    component: ChangePassComponent,
    data: {
      title: 'Cambia contraseña'
    }
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
