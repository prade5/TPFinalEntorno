import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JefecatedraRoutingModule } from './jefecatedra-routing.module';
import { ActionjefecatedraComponent } from 'src/app/components/jefecatedra/actionjefecatedra/actionjefecatedra.component';
import { JefecatedraComponent } from 'src/app/components/jefecatedra/jefecatedra/jefecatedra.component';


@NgModule({
  declarations: [
    JefecatedraComponent,ActionjefecatedraComponent
  ],
  imports: [
    CommonModule,
    JefecatedraRoutingModule
  ]
})
export class JefecatedraModule { }
