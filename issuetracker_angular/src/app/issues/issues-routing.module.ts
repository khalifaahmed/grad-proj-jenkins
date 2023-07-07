import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllIssuesComponent } from './pages/all-issues/all-issues.component';
import { CreateIssueComponent } from './pages/create-issue/create-issue.component';
import { IssueDetailsComponent } from './pages/issue-details/issue-details.component';
import { EditIssueComponent } from './pages/edit-issue/edit-issue.component';
import { ManagerGuard } from '../auth/services/manager.guard';
import { AssignedToMeComponent } from './pages/assigned-to-me/assigned-to-me.component';
import { ReportedByMeComponent } from './pages/reported-by-me/reported-by-me.component';

const routes: Routes = [
  {
    path: 'issue/:id',
    title: 'Issue Details | Issue Tracker',
    component: IssueDetailsComponent,
  },
  {
    path: 'new-issue',
    title: 'Create Issue | Issue Tracker',
    component: CreateIssueComponent,
  },
  {
    path: 'update/:id',
    canActivate: [ManagerGuard],
    title: 'Edit Issue | Issue Tracker',
    component: EditIssueComponent,
  },
  {
    path: 'assigned-to-me',
    title: 'Assigned To Me | Issue Tracker',
    component: AssignedToMeComponent,
  },
  {
    path: 'reported-by-me',
    title: 'Issues Reporetd By Me | Issue Tracker',
    component: ReportedByMeComponent,
  },
  {
    path: '',
    canActivate: [ManagerGuard],
    title: 'All Issues',
    component: AllIssuesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IssuesRoutingModule {}
