import { Component, Input } from '@angular/core';
import { IssueDto } from '../../Dtos/IssueDto';

@Component({
  selector: 'app-issues-table',
  templateUrl: './issues-table.component.html',
  styleUrls: ['./issues-table.component.css'],
})
export class IssuesTableComponent {
  @Input() issues!: IssueDto[];

  trackByFn(_index: number, issue: IssueDto): string {
    return issue.id;
  }

  OrderByStatusUp(): void {
    this.issues.sort((a, _b): number => {
      if (a.status === 'Open') {
        return 1;
      } else {
        return -1;
      }
    });
  }

  OrderByStatusDown(): void {
    this.issues.sort((a, _b): number => {
      if (a.status === 'Open') {
        return -1;
      } else {
        return 1;
      }
    });
  }

  OrderByPriorityUp(): void {
    this.issues.sort((a, b) => {
      if ((a.priority?.name || '') < (b.priority?.name || '')) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  OrderByPriorityDown(): void {
    this.issues.sort((a, b) => {
      if ((a.priority?.name || '') > (b.priority?.name || '')) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  OrderByEndDateUp(): void {
    this.issues.sort((a, b) => {
      if ((a.targetResolutionDate || '') > (b.targetResolutionDate || '')) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  OrderByEndDateDown(): void {
    this.issues.sort((a, b) => {
      if ((a.targetResolutionDate || '') < (b.targetResolutionDate || '')) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  OrderByProjectUp(): void {
    this.issues.sort((a, b) => {
      if (a.projectName < b.projectName) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  OrderByProjectDown(): void {
    this.issues.sort((a, b) => {
      if (a.projectName > b.projectName) {
        return 1;
      } else {
        return -1;
      }
    });
  }
}
