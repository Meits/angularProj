import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GateComponent } from './gate/gate.component';
import { UsersComponent } from './users/users.component';
import { UnitsComponent } from './units/units.component';
import { ArchivesComponent } from './archives/archives.component';
import { SourcesComponent } from './sources/sources.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './client/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  
  {
    path: 'gate',
    component: GateComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'units',
    component: UnitsComponent
  },
  {
    path: 'sources',
    component: SourcesComponent
  },
  {
    path: 'archives',
    component: ArchivesComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
