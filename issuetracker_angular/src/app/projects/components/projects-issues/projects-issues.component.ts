import { Component, Input, OnInit } from '@angular/core';
import { IssueDto } from 'src/app/issues/Dtos/IssueDto';

@Component({
  selector: 'app-projects-issues',
  templateUrl: './projects-issues.component.html',
  styleUrls: ['./projects-issues.component.css'],
})
export class ProjectsIssuesComponent implements OnInit {
  @Input() issues!: IssueDto[];

  filteredIssues: IssueDto[] = [];
  /**
   *
   */
  constructor() {}

  ngOnInit(): void {
    this.filteredIssues = this.issues;
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

  unassignedIssues() {
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
