import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersComponent } from './pages/all-users/all-users.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

const routes: Routes = [
  {
    path: '',
    title: 'All Users | Issue Tracker',
    component: AllUsersComponent,
  },
  {
    path: 'details/:id',
    title: 'User Details | Issue Tracker',
    component: UserDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
