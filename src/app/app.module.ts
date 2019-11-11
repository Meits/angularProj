import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UnitsComponent } from './units/units.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArchivesComponent } from './archives/archives.component';
import { GateComponent } from './gate/gate.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {  MzButtonModule, MzInputModule, MzModalModule, MzSwitchModule, MzSpinnerModule, MzCardModule, MzToastModule,MzSelectModule, MzRadioButtonModule      } from 'ngx-materialize';
import { SourcesComponent } from './sources/sources.component';
import { ModalSourcesComponent } from './modal-sources/modal-sources.component';
import { SourcesService } from './sources.service';
import { LoginComponent } from './client/login/login.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UnitsComponent,
    DashboardComponent,
    ArchivesComponent,
    GateComponent,
    SourcesComponent,
    ModalSourcesComponent,
    LoginComponent
  ],
  imports: [
    
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    MzButtonModule,
    MzInputModule ,
    MzModalModule,
    MzSwitchModule ,
    MzSpinnerModule,
    MzCardModule,
    MzToastModule ,
    MzSelectModule,
    MzRadioButtonModule
  ],
  entryComponents: [ModalSourcesComponent],
  bootstrap: [AppComponent],
  providers : [
    SourcesService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
})
export class AppModule { }
