import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetitionRoutingModule } from './competition-routing.module';
import { CompetitionComponent } from 'src/app/components/competition/competition.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ActioncompetitionComponent } from 'src/app/components/competition/actioncompetition/actioncompetition.component';

@NgModule({
  declarations: [
    CompetitionComponent,ActioncompetitionComponent
  ],
  imports: [
    CommonModule,
    CompetitionRoutingModule,ReactiveFormsModule,
    FormsModule,TableModule,AccordionModule,ButtonModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CompetitionModule { }
