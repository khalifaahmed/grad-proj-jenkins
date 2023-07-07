import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserDto } from 'src/app/users/Dtos/UserDto';
import { IssueDto } from '../../Dtos/IssueDto';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-assigned-to-me',
  templateUrl: './assigned-to-me.component.html',
  styleUrls: ['./assigned-to-me.component.css'],
})
export class AssignedToMeComponent implements OnInit {
  user!: UserDto;
  issues: IssueDto[] = [];
  overdue: IssueDto[] = [];
  openIssues: IssueDto[] = [];
  closedIssues: IssueDto[] = [];
  /**
   *
   */
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.USER!;
    this.userService.GetIssuesAssignedToUser(this.user.id).subscribe({
      next: (issues) => {
        this.issues = issues;
      },
      complete: () => {
        this.sortIssues();
      },
    });
  }

  sortIssues() {
    this.issues.forEach((issue) => {
      if (issue.status === 'Open') {
        this.openIssues.push(issue);
      } else if (issue.status === 'Closed') {
        this.closedIssues.push(issue);
      }

      if (
        issue.status === 'Open' &&
        new Date(issue.targetResolutionDate!) < new Date()
      ) {
        this.overdue.push(issue);
      }
    });
  }
}
