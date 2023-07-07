import { Component, Input, OnInit } from '@angular/core';
import { IssueDto } from 'src/app/issues/Dtos/IssueDto';

@Component({
  selector: 'app-sort-issues',
  templateUrl: './sort-issues.component.html',
  styleUrls: ['./sort-issues.component.css'],
})
export class SortIssuesComponent implements OnInit {
  @Input() allIssues!: IssueDto[];
  unAssignedIssues: IssueDto[] = [];
  openIssues: IssueDto[] = [];
  overdueIssues: IssueDto[] = [];
  recentIssues: IssueDto[] = [];

  ngOnInit(): void {
    this.sortIssues();
  }

  sortIssues() {
    for (const issue of this.allIssues) {
      if (issue.status === 'Open') {
        this.openIssues.push(issue);
      }

      if (
        issue.status === 'Open' &&
        new Date(issue.targetResolutionDate!) < new Date()
      ) {
        this.overdueIssues.push(issue);
      }

      if (
        new Date(issue.createdOn) >
        new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
      ) {
        this.recentIssues.push(issue);
      }

      if (issue.assignedUsers.length === 0) {
        this.unAssignedIssues.push(issue);
      }
    }
  }
}
