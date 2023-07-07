import { Component, OnInit } from '@angular/core';
import { UserDto } from '../../Dtos/UserDto';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { ProjectDto } from 'src/app/projects/Dtos/ProjectDto';
import { IssueDto } from 'src/app/issues/Dtos/IssueDto';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ToastType } from 'src/app/shared/Dtos/Toast';
import { enviroment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user?: UserDto;
  userProjects: ProjectDto[] = [];
  userIssues: IssueDto[] = [];

  isModalOpen: boolean = false;

  baseImageUrl: string = enviroment.awsUrl;

  /**
   *
   */
  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router,
    public location: Location,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    // user data
    this.usersService.GetUser(id).subscribe({
      next: (v) => (this.user = v),
      error: () => {
        this.router.navigate(['/not-found']);
      },
      complete: () => {
        // user issues
        this.usersService.GetIssuesAssignedToUser(id).subscribe((v) => {
          this.userIssues = v;
        });

        // user projects
        this.usersService
          .GetProjectsAssignedToUser(id)
          .subscribe((v) => (this.userProjects = v));
      },
    });
  }

  showModal() {
    this.isModalOpen = true;
  }

  hideModal() {
    this.isModalOpen = false;
  }

  deleteUser() {
    this.usersService.DeleteUser(this.user!.id).subscribe({
      error: (e) => {
        this.toast.show(
          e.error.detail || 'something went wrong please try again later.',
          5,
          ToastType.Error
        );

        this.isModalOpen = false;
      },
      complete: () => {
        this.location.back();
      },
    });
  }
}
