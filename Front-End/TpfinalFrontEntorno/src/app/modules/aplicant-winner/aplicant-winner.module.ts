import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {AccordionModule} from "primeng/accordion";
import {ButtonModule} from "primeng/button";
import { AplicantWinnerComponent } from 'src/app/components/competition/applicantwinner/applicantwinner.component';
import {AplicantWinnerRoutingModule} from "./aplicant-winner-routing.module";


@NgModule({
  declarations: [
    AplicantWinnerComponent
  ],
  imports: [
    CommonModule,
    AplicantWinnerRoutingModule,ReactiveFormsModule,
    FormsModule,TableModule,AccordionModule,ButtonModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AplicantWinnerModule { }
