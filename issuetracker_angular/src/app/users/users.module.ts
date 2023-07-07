import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AllUsersComponent } from './pages/all-users/all-users.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { SharedModule } from '../shared/shared.module';
import { EditRolesForUserModalComponent } from './components/edit-roles-for-user-modal/edit-roles-for-user-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRolesComponent } from './components/user-roles/user-roles.component';
import { UserProjectsComponent } from './components/user-projects/user-projects.component';
import { EditProjectForUserModalComponent } from './components/edit-project-for-user-modal/edit-project-for-user-modal.component';
import { UserIssuesComponent } from './components/user-issues/user-issues.component';
import { IssuesModule } from '../issues/issues.module';

@NgModule({
  declarations: [
    AllUsersComponent,
    UserDetailsComponent,
    EditRolesForUserModalComponent,
    UserRolesComponent,
    UserProjectsComponent,
    EditProjectForUserModalComponent,
    UserIssuesComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    IssuesModule,
  ],
  exports: [],
})
export class UsersModule {}
