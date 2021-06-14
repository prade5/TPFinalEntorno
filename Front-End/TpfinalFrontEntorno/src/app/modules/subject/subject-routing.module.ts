import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/components/auth/auth.guard';
import { RoleGuardGuard } from 'src/app/components/auth/role-guard.guard';
import { ActionsubjectComponent } from 'src/app/components/subject/actionsubject/actionsubject.component';
import { SubjectComponent } from 'src/app/components/subject/subject.component';

const routes: Routes = [ 
  {
  path: '',
  canLoad: [AuthGuard],
  canActivate: [RoleGuardGuard],
  component: SubjectComponent,
   data: {
    expectedRole: 'admin',
     title: 'Materia'
    }
  },
  {
    path: 'ActionSubject',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: ActionsubjectComponent,
     data: {
      expectedRole: 'admin',
       title: 'Acción materia'
      }
  },
  {
    path: 'ActionSubject/:id',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: ActionsubjectComponent,
     data: {
      expectedRole: 'admin',
       title: 'Acción materia'
      }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
