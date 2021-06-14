import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/components/auth/auth.guard';
import { RoleGuardGuard } from 'src/app/components/auth/role-guard.guard';
import { ActioncompetitionComponent } from 'src/app/components/competition/actioncompetition/actioncompetition.component';
import { CompetitionComponent } from 'src/app/components/competition/competition.component';
import { MenuadminComponent } from 'src/app/components/menu/menuadmin/menuadmin.component';
import { PrincipalComponent } from 'src/app/components/menu/principal/principal.component';
import { ActionroleComponent } from 'src/app/components/role/actionrole/actionrole.component';
import { RoleComponent } from 'src/app/components/role/role.component';
import { ActionuserComponent } from 'src/app/components/user/actionuser/actionuser.component';

const routes: Routes = [
  {
    path: '',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: MenuadminComponent,
     data: {
      expectedRole: 'admin',
       title: 'Acceder permiso'
      },
      children: [
        {
          path: 'User',
          loadChildren:() => import("../../modules/user/user.module").then((p) => p.UserModule)
        },
        {
          path: 'Role',
          component: RoleComponent,
          canLoad: [AuthGuard],
          canActivate: [RoleGuardGuard],
          data: {
            expectedRole: 'admin',
            title: 'Permiso'
          }
        },
        {
          path: 'ActionRole',
          canLoad: [AuthGuard],
          canActivate: [RoleGuardGuard],
          component: ActionroleComponent,
           data: {
            expectedRole: 'admin',
             title: 'Acceder permiso'
            }
        },
        {
          path: 'Competition',
          canLoad: [AuthGuard],
          canActivate: [RoleGuardGuard],
          component: CompetitionComponent,
          data: {
            expectedRole: 'admin',
            title: 'Acción usuario'
          }
        },
        {
          path: 'ActionCompetition',
          component: ActioncompetitionComponent,
          data: {title: 'Bienvenido a los concursos'}
        },
        {
          path: 'ActionCompetition',
          component: ActioncompetitionComponent,
          data: {title: 'Bienvenido a los concursos'}
        },
        {
          path: 'ActionUser',
          canLoad: [AuthGuard],
          canActivate: [RoleGuardGuard],
          component: ActionuserComponent,
          data: {
            expectedRole: 'admin',
            title: 'Acción usuario'
          }
        },
        {
          path: 'Principal',
          canLoad: [AuthGuard],
          canActivate: [RoleGuardGuard],
          component: PrincipalComponent,
           data: {
            expectedRole: 'admin',
             title: 'Menu principal'
            }
        },
        {
          path: 'Subject',
          loadChildren: () => import('../../modules/subject/subject.module').then((u) => u.SubjectModule)
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuprincipalRoutingModule { }
