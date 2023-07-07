import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllNotificationsComponent } from './pages/all-notifications/all-notifications.component';

const routes: Routes = [
  {
    path: '',
    component: AllNotificationsComponent,
    title: 'Notifications | Issue Tracker',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsRoutingModule {}
