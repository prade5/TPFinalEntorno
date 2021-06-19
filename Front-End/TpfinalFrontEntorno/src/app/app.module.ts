import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule} from '@angular/forms';
import { JwtHelperService,  JWT_OPTIONS  } from '@auth0/angular-jwt';
import { AuthGuard } from './components/auth/auth.guard';

import {ReactiveFormsModule} from '@angular/forms';

import { appRoutes } from './route/route';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { StateloginService } from './services/auth/Statelogin.service';
import { HomeComponent } from './components/home/home.component';
import { MenuprincipalModule } from './modules/menuprincipale/menuprincipal.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,LoginComponent, HomeComponent,
  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,
    RouterModule.forRoot(appRoutes,
      {
        relativeLinkResolution: 'legacy'
      }),
    HttpClientModule,
    MessagesModule,
    MenuprincipalModule,
    ConfirmDialogModule,BrowserAnimationsModule
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
