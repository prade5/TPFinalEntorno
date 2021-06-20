import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JefecatedraRoutingModule } from './jefecatedra-routing.module';
import { ActionjefecatedraComponent } from 'src/app/components/jefecatedra/actionjefecatedra/actionjefecatedra.component';
import { JefecatedraComponent } from 'src/app/components/jefecatedra/jefecatedra/jefecatedra.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';


@NgModule({
  declarations: [
    JefecatedraComponent,ActionjefecatedraComponent
  ],
  imports: [
    CommonModule,
    JefecatedraRoutingModule,ReactiveFormsModule,AutocompleteLibModule,
    FormsModule,TableModule,AccordionModule,ButtonModule
  ]
})
export class JefecatedraModule { }
