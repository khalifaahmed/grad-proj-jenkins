import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './pages/dashbord/dashbord.component';

const routes: Routes = [
  {
    path: '',
    title: 'Dashboard | Issue Tracker',
    component: DashbordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
