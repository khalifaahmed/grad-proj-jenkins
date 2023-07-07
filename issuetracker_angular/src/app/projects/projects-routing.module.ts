import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProjectsComponent } from './pages/all-projects/all-projects.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { UpdateProjectComponent } from './pages/update-project/update-project.component';

const routes: Routes = [
  {
    path: 'project/:id',
    title: 'Project Detail | Issue Tracker',
    component: ProjectDetailComponent,
  },
  {
    path: 'create',
    title: 'Create Project | Issue Tracker',
    component: CreateProjectComponent,
  },
  {
    path: 'update/:id',
    title: 'Update Project | Issue Tracker',
    component: UpdateProjectComponent,
  },
  {
    path: '',
    component: AllProjectsComponent,
    title: 'All Projects | Issue Tracker',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
