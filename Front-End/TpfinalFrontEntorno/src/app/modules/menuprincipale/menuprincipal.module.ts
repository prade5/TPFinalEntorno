import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuprincipalRoutingModule } from './menuprincipal-routing.module';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
// import { TooltipModule } from 'primeng/tooltip';
import { UserComponent } from 'src/app/components/user/user.component';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { ActioncompetitionComponent } from 'src/app/components/competition/actioncompetition/actioncompetition.component';
import { MenuadminComponent } from 'src/app/components/menu/menuadmin/menuadmin.component';
import { ActionroleComponent } from 'src/app/components/role/actionrole/actionrole.component';
import { RoleComponent } from 'src/app/components/role/role.component';
import { SubjectComponent } from 'src/app/components/subject/subject.component';
import { PrincipalComponent } from 'src/app/components/menu/principal/principal.component';
import { SubjectModule } from '../subject/subject.module';
import { CompetitionModule } from '../competition/competition.module';
import { CourseModule } from '../course/course.module';
import { PostulationComponent } from 'src/app/components/postulation/postulation.component';
import { MapsiteComponent } from 'src/app/components/mapsite/mapsite.component';


@NgModule({
  declarations: [
    PrincipalComponent,MenuadminComponent, SubjectComponent,MapsiteComponent,
    RoleComponent,ActionroleComponent,AdminComponent,PostulationComponent
  ],
  imports: [
    CommonModule,
    MenuprincipalRoutingModule,ReactiveFormsModule,FormsModule,
    SharedModule,TableModule,AccordionModule,ButtonModule,ToastrModule.forRoot({
      progressBar: true,
      timeOut: 5000,
      enableHtml: true,
      preventDuplicates: true,
      progressAnimation:'increasing'
    }),SubjectModule,CompetitionModule,CourseModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MenuprincipalModule { }
