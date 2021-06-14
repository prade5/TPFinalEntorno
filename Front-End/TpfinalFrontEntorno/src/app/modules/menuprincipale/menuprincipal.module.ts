import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuprincipalRoutingModule } from './menuprincipal-routing.module';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { UserComponent } from 'src/app/components/user/user.component';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { ActioncompetitionComponent } from 'src/app/components/competition/actioncompetition/actioncompetition.component';
import { CompetitionComponent } from 'src/app/components/competition/competition.component';
import { MenuadminComponent } from 'src/app/components/menu/menuadmin/menuadmin.component';
import { ActionroleComponent } from 'src/app/components/role/actionrole/actionrole.component';
import { RoleComponent } from 'src/app/components/role/role.component';
import { SubjectComponent } from 'src/app/components/subject/subject.component';
import { ActionuserComponent } from 'src/app/components/user/actionuser/actionuser.component';
import { PrincipalComponent } from 'src/app/components/menu/principal/principal.component';
import { SubjectModule } from '../subject/subject.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    PrincipalComponent,UserComponent, CompetitionComponent, MenuadminComponent,
    ActioncompetitionComponent, SubjectComponent,
    RoleComponent,ActionroleComponent,AdminComponent,ActionuserComponent
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
    }),TooltipModule,SubjectModule,BrowserAnimationsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MenuprincipalModule { }
