import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {TableModule} from 'primeng/table';
import { FormsModule} from '@angular/forms';
import {AccordionModule} from 'primeng/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';

import { ToastrModule } from 'ngx-toastr';

import {ReactiveFormsModule} from '@angular/forms';

import { appRoutes } from './route/route';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { ActionuserComponent } from './components/user/actionuser/actionuser.component';
import { RoleComponent } from './components/role/role.component';
import { ActionroleComponent } from './components/role/actionrole/actionrole.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AdminComponent,
    ActionuserComponent,
    RoleComponent,
    ActionroleComponent
  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,
    RouterModule.forRoot(appRoutes,
      {
        relativeLinkResolution: 'legacy'
      }),
    TableModule,AccordionModule,ButtonModule,
    HttpClientModule,BrowserAnimationsModule,ToastrModule.forRoot({
      progressBar: true,
    })
  ],
  exports:[RouterModule],
  providers: [Title],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
