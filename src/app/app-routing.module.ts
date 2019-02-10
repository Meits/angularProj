import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GateComponent } from './gate/gate.component';
import { UsersComponent } from './users/users.component';
import { UnitsComponent } from './units/units.component';
import { ArchivesComponent } from './archives/archives.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  
  {
    path: 'gate',
    component: GateComponent
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
    path: 'archives',
    component: ArchivesComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
