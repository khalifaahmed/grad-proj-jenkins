import { Component, OnInit } from '@angular/core';
import { IssueDto } from 'src/app/issues/Dtos/IssueDto';
import { UserDto } from 'src/app/users/Dtos/UserDto';
import { ProjectDto } from '../../Dtos/ProjectDto';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ToastType } from 'src/app/shared/Dtos/Toast';
import { Observable, firstValueFrom, of } from 'rxjs';
import { IssuesService } from 'src/app/issues/services/issues.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
})
export class ProjectDetailComponent implements OnInit {
  assignedUsers: UserDto[] = [];
  issues: IssueDto[] = [];
  project?: ProjectDto;
  isDataReady: Observable<boolean> = of(false);

  isDeleteModalOpen: boolean = false;

  showDeleteModal() {
    this.isDeleteModalOpen = true;
  }

  hideDeleteModal() {
    this.isDeleteModalOpen = false;
  }
  /**
   *
   */
  constructor(
    private projectService: ProjectsService,
    private issueService: IssuesService,
    private route: ActivatedRoute,
    public location: Location,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.params['id'];

    this.projectService.GetProject(projectId).subscribe({
      next: (v) => {
        this.project = v;
      },
      error: () => {
        this.router.navigate(['/not-found']);
      },
      complete: () => {
        // get issues
        this.projectService
          .GetIssuesInProject(projectId)
          .subscribe(
            async (v) => (
              (this.issues = v),
              await this.getIssueUsers(),
              (this.isDataReady = of(true))
            )
          );

        // get users
        this.projectService
          .GetUsersAssignedToProject(projectId)
          .subscribe((v) => (this.assignedUsers = v));
      },
    });
  }

  async getIssueUsers(): Promise<void> {
    await Promise.all(
      this.issues.map(async (issue) => {
        issue.assignedUsers = await firstValueFrom(
          this.issueService.getUsersAssignedToIssue(issue.id)
        );
      })
    );
  }

  // delete project
  deleteProject() {
    this.projectService.DeleteProject(this.project!.id).subscribe({
      error: (e) => {
        this.toast.show(
          e.error.detail || 'something went wrong please try again later.',
          5,
          ToastType.Error
        );

        this.isDeleteModalOpen = false;
      },
      complete: () => {
        this.location.back();
      },
    });
  }
}
