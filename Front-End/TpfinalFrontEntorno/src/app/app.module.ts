import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {TableModule} from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule} from '@angular/forms';
import {AccordionModule} from 'primeng/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import { JwtHelperService,  JWT_OPTIONS  } from '@auth0/angular-jwt';
import { AuthGuard } from './components/auth/auth.guard';
import { ToastrModule } from 'ngx-toastr';
import { TooltipModule } from 'primeng/tooltip';
import { TokenInterceptorService } from './services/auth/token-interceptor.service';

import {ReactiveFormsModule} from '@angular/forms';

import { appRoutes } from './route/route';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { ActionuserComponent } from './components/user/actionuser/actionuser.component';
import { RoleComponent } from './components/role/role.component';
import { ActionroleComponent } from './components/role/actionrole/actionrole.component';
import { LoginComponent } from './components/login/login.component';
import { StateloginService } from './services/auth/Statelogin.service';
import { PrincipalComponent } from './components/menu/principal/principal.component';
import { NavbarComponent } from './components/menu/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CompetitionComponent } from './components/competition/competition.component';

@NgModule({
  declarations: [
    AppComponent,UserComponent,AdminComponent,ActionuserComponent,
    RoleComponent,ActionroleComponent,LoginComponent, PrincipalComponent, NavbarComponent, HomeComponent, CompetitionComponent
  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,
    RouterModule.forRoot(appRoutes,
      {
        relativeLinkResolution: 'legacy'
      }),
    TableModule,AccordionModule,ButtonModule,TooltipModule,
    HttpClientModule,BrowserAnimationsModule,ToastrModule.forRoot({
      progressBar: true,
      timeOut: 5000,
      enableHtml: true,
      preventDuplicates: true,
      progressAnimation:'increasing'
    }),
    MessagesModule,
    ConfirmDialogModule,
  ],
  exports:[RouterModule],
  providers: [Title, {provide:JWT_OPTIONS, useValue:JWT_OPTIONS},JwtHelperService,AuthGuard,StateloginService
  //    {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: TokenInterceptorService,
  //   multi: true
  // }
],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
