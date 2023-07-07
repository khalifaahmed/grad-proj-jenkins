import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectDto } from '../../Dtos/ProjectDto';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css'],
})
export class AllProjectsComponent implements OnInit {
  projects!: Observable<ProjectDto[]>;
  /**
   *
   */
  constructor(private ProjectsService: ProjectsService) {}

  ngOnInit(): void {
    this.projects = this.ProjectsService.GetAllProjects();
    // .subscribe({
    //   next: (v: ProjectDto[]) => {
    //     this.projects = v;
    //   },
    //   complete: () => {
    //     console.log(this.projects);
    //   },
    // });
  }

  trackByFn(_index: number, project: ProjectDto): string {
    return project.id;
  }
}
