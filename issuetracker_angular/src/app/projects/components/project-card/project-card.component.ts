import { Component, Input } from '@angular/core';
import { ProjectDto } from '../../Dtos/ProjectDto';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent {
  @Input() project!: ProjectDto;
  isModalOpen: boolean = false;
  // deleteBtnValue: string = 'Delete';
  // deleteBtnState: boolean = false;
  /**
   *
   */
  constructor(private projectsService: ProjectsService) {}

  deleteProject(): void {
    // this.deleteBtnState = true;
    // this.deleteBtnValue = 'Wait....';

    this.projectsService.DeleteProject(this.project.id).subscribe({
      complete: async () => {
        location.reload();
      },
    });
  }

  showConfirmDelete(): void {
    this.isModalOpen = true;
  }

  hideConfirmDelete(): void {
    // document.getElementById(id)!.style.display = 'none';
    this.isModalOpen = false;
  }
}
