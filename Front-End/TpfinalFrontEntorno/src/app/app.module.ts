import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule} from '@angular/forms';
import { JwtHelperService,  JWT_OPTIONS  } from '@auth0/angular-jwt';
import {ReactiveFormsModule} from '@angular/forms';
import { appRoutes } from './route/route';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuprincipalModule } from './modules/menuprincipale/menuprincipal.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './components/welcome/welcome/welcome.component';
import { ErrorComponent } from './components/error/error.component';
import { SharedModule } from "./components/shared/shared.module";
import { AboutComponent } from './components/about/about.component';
import {CardModule} from "primeng/card";
import { DetailComponent } from './components/competition/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,LoginComponent, HomeComponent, WelcomeComponent, ErrorComponent, AboutComponent, DetailComponent,
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(appRoutes,
      {
        relativeLinkResolution: 'legacy'
      }),
    HttpClientModule,
    MessagesModule,
    MenuprincipalModule,
    ConfirmDialogModule,BrowserAnimationsModule, SharedModule,
    BrowserAnimationsModule, CardModule
  ],
  exports:[RouterModule],
  providers: [Title, {provide:JWT_OPTIONS, useValue:JWT_OPTIONS},JwtHelperService,
],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
