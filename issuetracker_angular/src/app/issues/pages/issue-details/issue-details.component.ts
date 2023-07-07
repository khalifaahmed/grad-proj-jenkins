import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IssuesService } from '../../services/issues.service';
import { IssueDto } from '../../Dtos/IssueDto';
import { UserDto } from 'src/app/users/Dtos/UserDto';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ToastType } from 'src/app/shared/Dtos/Toast';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.css'],
})
export class IssueDetailsComponent implements OnInit {
  issue?: IssueDto;
  issueUsers: UserDto[] = [];

  isDeleteIssueModalOpen: boolean = false;
  isCloseIssueModalOpen: boolean = false;
  /**
   *
   */
  constructor(
    private route: ActivatedRoute,
    public location: Location,
    private issueService: IssuesService,
    public authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const issueId: string = params['id'];

      this.issueService.GetIssue(issueId).subscribe({
        next: (v) => {
          this.issue = v;
        },
        error: () => {
          this.router.navigate(['/not-found']);
        },
        complete: () => {
          this.issueService.getUsersAssignedToIssue(issueId).subscribe((v) => {
            this.issueUsers = v;
          });
        },
      });
    });
  }

  // delete Issue methods
  hideDeleteModal() {
    this.isDeleteIssueModalOpen = false;
  }

  openDeleteModal() {
    this.isDeleteIssueModalOpen = true;
  }

  deleteIssue() {
    this.issueService.DeleteIssue(this.issue!.id).subscribe({
      error: (e) => {
        this.toast.show(
          e.error.detail || 'something went wrong please try again later.',
          5,
          ToastType.Error
        );
        this.isDeleteIssueModalOpen = false;
      },

      complete: () => {
        this.location.back();
      },
    });
  }
  // end of delete issue methods

  // close issue methods
  showCloseIssueModal() {
    this.isCloseIssueModalOpen = true;
  }

  hideCloseIssueModal() {
    this.isCloseIssueModalOpen = false;
  }

  closedIssueSuccessfully(issue: IssueDto) {
    this.issue = issue;
    this.hideCloseIssueModal();
  }

  // end of close issue
}
