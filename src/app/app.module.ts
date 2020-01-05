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


import {  MzButtonModule, MzInputModule, MzModalModule, MzNavbarModule, MzSwitchModule, MzSpinnerModule, MzCardModule, MzToastModule,MzSelectModule, MzRadioButtonModule, MzCheckboxModule, MzSidenavModule, MzTabModule, MzDatepickerModule      } from 'ngx-materialize';
import { SourcesComponent } from './sources/sources.component';
import { ModalSourcesComponent } from './modal-sources/modal-sources.component';
import { SourcesService } from './sources.service';
import { LoginComponent } from './client/login/login.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { PreloaderComponent } from './_childComponents/preloader/preloader.component';
import { HttpService } from './services/http-service';
import { PreloaderService } from './services/preloader.service';
import { RequestOptions, XHRBackend, HttpModule } from '@angular/http';
import { NavigationComponent } from './_childComponents/navigation/navigation/navigation.component';

import { OwlModule } from 'ngx-owl-carousel';
import { ModalLeadComponent } from './_childComponents/modalLead/modal-lead/modal-lead.component';
import { NewLeadPipe } from './pipes/lead/new-lead.pipe';
import { ModalHistoryComponent } from './_childComponents/modalLead/modal-history/modal-history.component';
import { EventPipe } from './pipes/leadComments/event.pipe';
import { TypePipe } from './pipes/lead/type.pipe';
import { ModalQualityComponent } from './_childComponents/modalLead/modal-quality/modal-quality.component';
import { ProcessingPipe } from './pipes/lead/processing.pipe';
import { DonePipe } from './pipes/lead/done.pipe';
import { AnaliticsComponent } from './analitics/analitics.component';
import { TasksComponent } from './tasks/tasks.component';
import { ModalTaskComponent } from './_childComponents/modalTask/modal-task/modal-task.component';
import { MyTasksPipe } from './pipes/task/my-tasks.pipe';
import { ModalTaskHistoryComponent } from './_childComponents/modalRask/modal-task-history/modal-task-history.component';
import { TaskArchivesComponent } from './archives/task-archives/task-archives.component';
import { ModalArchiveTaskHistoryComponent } from './archives/modal-archive-task-history/modal-archive-task-history.component';
import { ModalArchiveLeadHistoryComponent } from './archives/modal-archive-lead-history/modal-archive-lead-history.component';
import { ModalUserComponent } from './_childComponents/user/modal-user/modal-user.component';


export function httpServiceFactory(backend: XHRBackend, defaultOptions: RequestOptions, preloaderService: PreloaderService) {
  return new HttpService(backend, defaultOptions, preloaderService);
}


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
    LoginComponent,
    PreloaderComponent,
    NavigationComponent,
    ModalLeadComponent,
    NewLeadPipe,
    ModalHistoryComponent,
    EventPipe,
    TypePipe,
    ModalQualityComponent,
    ProcessingPipe,
    DonePipe,
    AnaliticsComponent,
    TasksComponent,
    ModalTaskComponent,
    MyTasksPipe,
    ModalTaskHistoryComponent,
    TaskArchivesComponent,
    ModalArchiveTaskHistoryComponent,
    ModalArchiveLeadHistoryComponent,
    ModalUserComponent
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
    MzRadioButtonModule,
    MzCheckboxModule,
    MzSpinnerModule,
    HttpModule,
    OwlModule,
    MzNavbarModule,
    MzTabModule, 
    MzSidenavModule,
    MzDatepickerModule  
  ],
  entryComponents: [ModalSourcesComponent, ModalLeadComponent, ModalHistoryComponent, ModalQualityComponent, ModalTaskComponent, ModalTaskHistoryComponent, ModalArchiveTaskHistoryComponent, ModalArchiveLeadHistoryComponent, ModalUserComponent],
  bootstrap: [AppComponent],
  providers : [
    
    SourcesService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: HttpService,
      deps: [XHRBackend, RequestOptions, PreloaderService],
      useFactory: httpServiceFactory,
    },
  ]
})
export class AppModule { }
