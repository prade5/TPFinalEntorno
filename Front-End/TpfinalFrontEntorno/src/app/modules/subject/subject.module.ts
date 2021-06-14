import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from './subject-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionsubjectComponent } from 'src/app/components/subject/actionsubject/actionsubject.component';


@NgModule({
  declarations: [
    ActionsubjectComponent
  ],
  imports: [
    CommonModule,
    SubjectRoutingModule,ReactiveFormsModule,
    FormsModule
  ]
})
export class SubjectModule { }
