import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PerfilComponent } from 'src/app/components/user/perfil/perfil.component';
import { ActionuserComponent } from 'src/app/components/user/actionuser/actionuser.component';
import { UserComponent } from 'src/app/components/user/user.component';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ChangePassComponent } from 'src/app/components/change-pass/change-pass.component';


@NgModule({
  declarations: [
    UserComponent, PerfilComponent,ActionuserComponent,ChangePassComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,FormsModule ,ReactiveFormsModule,
    TableModule,AccordionModule,ButtonModule,TooltipModule
  ]
})
export class UserModule { }
