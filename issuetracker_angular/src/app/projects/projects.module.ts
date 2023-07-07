import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { AllProjectsComponent } from './pages/all-projects/all-projects.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateProjectComponent } from './pages/update-project/update-project.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectUsersComponent } from './components/project-users/project-users.component';
import { EditUsersInProjectModalComponent } from './components/edit-users-in-project-modal/edit-users-in-project-modal.component';
import { ProjectsIssuesComponent } from './components/projects-issues/projects-issues.component';
import { IssuesModule } from '../issues/issues.module';
import { UsersModule } from '../users/users.module';
import { ProjectIssuesPerMonthChartComponent } from './components/project-issues-per-month-chart/project-issues-per-month-chart.component';
import { ProjectIssuesPieChartComponent } from './components/project-issues-pie-chart/project-issues-pie-chart.component';

@NgModule({
  declarations: [
    AllProjectsComponent,
    ProjectDetailComponent,
    ProjectCardComponent,
    CreateProjectComponent,
    UpdateProjectComponent,
    ProjectUsersComponent,
    EditUsersInProjectModalComponent,
    ProjectsIssuesComponent,
    ProjectIssuesPerMonthChartComponent,
    ProjectIssuesPieChartComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    UsersModule,
    IssuesModule,
  ],
})
export class ProjectsModule {}
