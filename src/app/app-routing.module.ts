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
import { AnaliticsComponent } from './analitics/analitics.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path: 'gate',
    component: GateComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'units',
    component: UnitsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sources',
    component: SourcesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'archives',
    component: ArchivesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'analitics',
    component: AnaliticsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
