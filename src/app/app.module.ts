import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UnitsComponent } from './units/units.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArchivesComponent } from './archives/archives.component';
import { GateComponent } from './gate/gate.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {  MzButtonModule, MzInputModule, MzModalModule, MzSwitchModule, MzSpinnerModule, MzCardModule     } from 'ngx-materialize';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UnitsComponent,
    DashboardComponent,
    ArchivesComponent,
    GateComponent
  ],
  imports: [
    
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    MzButtonModule,
    MzInputModule ,
    MzModalModule,
    MzSwitchModule ,
    MzSpinnerModule,
    MzCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
