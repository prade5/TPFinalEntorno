import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AplicantRoutingModule } from './aplicant-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AplicantComponent } from 'src/app/components/aplicant/aplicant/aplicant.component';


@NgModule({
  declarations: [
    AplicantComponent
  ],
  imports: [
    CommonModule,
    AplicantRoutingModule,ReactiveFormsModule,
    FormsModule,TableModule,AccordionModule,ButtonModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AplicantModule { }
