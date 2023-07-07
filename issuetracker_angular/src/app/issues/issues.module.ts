import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuesRoutingModule } from './issues-routing.module';
import { AllIssuesComponent } from './pages/all-issues/all-issues.component';
import { IssuesTableComponent } from './components/issues-table/issues-table.component';
import { CreateIssueComponent } from './pages/create-issue/create-issue.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IssueDetailsComponent } from './pages/issue-details/issue-details.component';
import { SharedModule } from '../shared/shared.module';
import { CloseIssueModalComponent } from './components/close-issue-modal/close-issue-modal.component';
import { IssueUsersComponent } from './components/issue-users/issue-users.component';
import { EditUsersInIssueComponent } from './components/edit-users-in-issue/edit-users-in-issue.component';
import { EditIssueComponent } from './pages/edit-issue/edit-issue.component';
import { EditIssuePriorityComponent } from './components/edit-issue-priority/edit-issue-priority.component';
import { AssignedToMeComponent } from './pages/assigned-to-me/assigned-to-me.component';
import { ReportedByMeComponent } from './pages/reported-by-me/reported-by-me.component';

@NgModule({
  declarations: [
    AllIssuesComponent,
    IssuesTableComponent,
    CreateIssueComponent,
    IssueDetailsComponent,
    CloseIssueModalComponent,
    IssueUsersComponent,
    EditUsersInIssueComponent,
    EditIssueComponent,
    EditIssuePriorityComponent,
    AssignedToMeComponent,
    ReportedByMeComponent,
  ],
  imports: [
    CommonModule,
    IssuesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [IssuesTableComponent],
})
export class IssuesModule {}
