import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { AllNotificationsComponent } from './pages/all-notifications/all-notifications.component';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [AllNotificationsComponent, NotificationComponent],
  imports: [CommonModule, NotificationsRoutingModule],
  exports: [NotificationComponent],
})
export class NotificationsModule {}
