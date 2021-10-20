import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/components/auth/auth.guard';
import { RoleGuardGuard } from 'src/app/components/auth/role-guard.guard';
import { ActioncompetitionComponent } from 'src/app/components/competition/actioncompetition/actioncompetition.component';
import { CompetitionComponent } from 'src/app/components/competition/competition.component';
import { MapsiteComponent } from 'src/app/components/mapsite/mapsite.component';
import { MenuadminComponent } from 'src/app/components/menu/menuadmin/menuadmin.component';
import { PrincipalComponent } from 'src/app/components/menu/principal/principal.component';
import { PostulationComponent } from 'src/app/components/postulation/postulation.component';
import { ActionroleComponent } from 'src/app/components/role/actionrole/actionrole.component';
import { RoleComponent } from 'src/app/components/role/role.component';
import { WelcomeComponent } from 'src/app/components/welcome/welcome/welcome.component';

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
          path: 'Welcome',
          component: WelcomeComponent,
          canLoad: [AuthGuard],
          data: {
            title: 'Bienvienido al sistema de concurso'
          }
        },
        // {
        //   path: 'Role',
        //   component: RoleComponent,
        //   canLoad: [AuthGuard],
        //   canActivate: [RoleGuardGuard],
        //   data: {
        //     expectedRole: 'admin',
        //     title: 'Permiso'
        //   }
        // },
        // {
        //   path: 'ActionRole',
        //   canLoad: [AuthGuard],
        //   canActivate: [RoleGuardGuard],
        //   component: ActionroleComponent,
        //    data: {
        //     expectedRole: 'admin',
        //      title: 'Acceder permiso'
        //     }
        // },
        {
          path: 'jefedecatedra_materia',
          loadChildren: () => import("../../modules/jefecatedra/jefecatedra.module").then((c) => c.JefecatedraModule)
        },
        {
          path: 'Competition',
          loadChildren: () => import("../../modules/competition/competition.module").then((c) => c.CompetitionModule)
        },
        {
          path: 'Applicant',
          loadChildren: () => import("../../modules/aplicant/aplicant.module").then((c) => c.AplicantModule)
        },
        {
          path: 'ApplicantWinner',
          loadChildren: () => import("../../modules/aplicant-winner/aplicant-winner.module").then((c) => c.AplicantWinnerModule)
        },
        {
          path:'Course',
          loadChildren: () => import("../../modules/course/course.module").then((s) => s.CourseModule)
        },
        {
          path: 'OpenCompetion',
          component: PostulationComponent,
          data: {title: 'Concursos abiertos'}
        },
        {
          path: 'SiteMap',
          canLoad: [AuthGuard],
          component: MapsiteComponent,
           data: {
             title: 'Mapa del sitio'
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
