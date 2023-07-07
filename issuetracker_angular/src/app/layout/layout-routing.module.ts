import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { ManagerGuard } from '../auth/services/manager.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'projects',
        canActivate: [ManagerGuard],
        loadChildren: () =>
          import('../projects/projects.module').then((m) => m.ProjectsModule),
      },
      {
        path: 'issues',
        loadChildren: () =>
          import('../issues/issues.module').then((m) => m.IssuesModule),
      },
      {
        path: 'users',
        canActivate: [ManagerGuard],
        loadChildren: () =>
          import('../users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'adminstration',
        canActivate: [ManagerGuard],
        loadChildren: () =>
          import('../adminstration/adminstration.module').then(
            (m) => m.AdminstrationModule
          ),
      },
      {
        path: 'dashboard',
        canActivate: [ManagerGuard],
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('../notifications/notifications.module').then(
            (m) => m.NotificationsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
