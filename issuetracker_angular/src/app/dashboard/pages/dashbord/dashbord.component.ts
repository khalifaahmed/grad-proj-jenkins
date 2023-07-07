import { Component, OnInit } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import { IssueDto } from 'src/app/issues/Dtos/IssueDto';
import { IssuesService } from 'src/app/issues/services/issues.service';
import { ProjectDto } from 'src/app/projects/Dtos/ProjectDto';
import { ProjectsService } from 'src/app/projects/services/projects.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
})
export class DashbordComponent implements OnInit {
  allIssues: IssueDto[] = [];
  allProjects: ProjectDto[] = [];
  isDataReady = of(false);

  /**
   *
   */
  constructor(
    private issueService: IssuesService,
    private projectService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.execute();
  }

  async execute() {
    this.allProjects = await firstValueFrom(
      this.projectService.GetAllProjects()
    );

    await Promise.all(
      this.allProjects.map(async (project) => {
        project.issues = await firstValueFrom(
          this.projectService.GetIssuesInProject(project.id)
        );

        await Promise.all(
          project.issues.map(async (issue) => {
            issue.assignedUsers = await firstValueFrom(
              this.issueService.getUsersAssignedToIssue(issue.id)
            );
          })
        );

        this.allIssues.push(...project.issues);
      })
    );

    this.isDataReady = of(true);
  }
}
