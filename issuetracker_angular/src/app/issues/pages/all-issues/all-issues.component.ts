import { Component } from '@angular/core';
// import { Observable } from 'rxjs';
import { IssueDto } from '../../Dtos/IssueDto';
import { IssuesService } from '../../services/issues.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-all-issues',
  templateUrl: './all-issues.component.html',
  styleUrls: ['./all-issues.component.css'],
})
export class AllIssuesComponent {
  issues: IssueDto[] = [];
  filteredIssues: IssueDto[] = [];
  /**
   *
   */
  constructor(private issuesService: IssuesService) {}

  ngOnInit(): void {
    this.issuesService.GetAllIssues().subscribe((value) => {
      (this.issues = value), (this.filteredIssues = value);
    });
  }

  allIssues() {
    this.filteredIssues = this.issues;
  }

  openIssues() {
    this.filteredIssues = this.issues.filter((issue) => {
      return issue.status === 'Open';
    });
  }

  closedIssues() {
    this.filteredIssues = this.issues.filter((issue) => {
      return issue.status === 'Closed';
    });
  }

  overdueIssues() {
    this.filteredIssues = this.issues.filter((issue) => {
      return (
        issue.status === 'Open' &&
        new Date(issue.targetResolutionDate!) < new Date()
      );
    });
  }

  async unassignedIssues() {
    await Promise.all(
      this.issues.map(async (issue) => {
        issue.assignedUsers = await firstValueFrom(
          this.issuesService.getUsersAssignedToIssue(issue.id)
        );
      })
    );
    this.filteredIssues = this.issues.filter((issue) => {
      return issue.assignedUsers.length === 0;
    });
  }

  changeIssues(value: string) {
    if (value === 'all-issues') {
      this.allIssues();
    } else if (value === 'over-due') {
      this.overdueIssues();
    } else if (value === 'un-assigned') {
      this.unassignedIssues();
    } else if (value === 'open') {
      this.openIssues();
    } else if (value === 'closed') {
      this.closedIssues();
    }
  }
}
