import { Component, Input } from '@angular/core';
import { ProjectDto } from 'src/app/projects/Dtos/ProjectDto';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.css'],
})
export class UserProjectsComponent {
  @Input() userId?: string;
  @Input() userProjects!: ProjectDto[];

  isProjectsModalOpen: boolean = false;

  showProjectsModal() {
    this.isProjectsModalOpen = true;
  }

  hideProjectsModal() {
    this.isProjectsModalOpen = false;
  }

  newProjects(projects: ProjectDto[]) {
    this.userProjects = projects;
  }
}
