import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { IconsSidebarComponent } from './components/icons-sidebar/icons-sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NotificationsIconComponent } from './components/notifications-icon/notifications-icon.component';
import { NotificationsModule } from '../notifications/notifications.module';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    IconsSidebarComponent,
    LayoutComponent,
    NotificationsIconComponent,
  ],
  imports: [CommonModule, LayoutRoutingModule, NotificationsModule],
})
export class LayoutModule {}
