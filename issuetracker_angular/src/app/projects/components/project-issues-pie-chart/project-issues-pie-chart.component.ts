import { Component, Input, OnInit } from '@angular/core';
import Chart, { ChartConfiguration } from 'chart.js/auto';
// import { firstValueFrom } from 'rxjs';
import { IssueDto } from 'src/app/issues/Dtos/IssueDto';
// import { IssuesService } from 'src/app/issues/services/issues.service';

@Component({
  selector: 'app-project-issues-pie-chart',
  templateUrl: './project-issues-pie-chart.component.html',
  styleUrls: ['./project-issues-pie-chart.component.css'],
})
export class ProjectIssuesPieChartComponent implements OnInit {
  @Input() issues!: IssueDto[];

  chart!: Chart;
  config!: ChartConfiguration;

  data: number[] = [];

  /**
   *
   */
  constructor() {}

  ngOnInit(): void {
    // await this.getUsers();
    this.initializeData();
    this.craeteChart();
  }

  // async getUsers(): Promise<void> {
  //   await Promise.all(
  //     this.issues.map(async (issue) => {
  //       issue.assignedUsers = await firstValueFrom(
  //         this.issueService.getUsersAssignedToIssue(issue.id)
  //       );
  //     })
  //   );
  // }

  initializeData(): void {
    let overdue: number = 0;
    let unAssigned: number = 0;
    let open: number = 0;
    let closed: number = 0;

    for (const issue of this.issues) {
      if (issue.status === 'Open') {
        open += 1;
      } else if (issue.status === 'Closed') {
        closed += 1;
      }
      if (
        issue.status === 'Open' &&
        new Date(issue.targetResolutionDate!) < new Date()
      ) {
        overdue += 1;
      }
      if (issue.assignedUsers.length === 0) {
        unAssigned += 1;
      }
    }

    this.data[0] = overdue;
    this.data[1] = unAssigned;
    this.data[2] = open;
    this.data[3] = closed;
  }

  craeteChart(): void {
    // representation data
    // this.data = [1, 3, 4, 7];
    this.config = {
      type: 'pie',
      data: {
        labels: [
          'over due issues',
          'un assigned issues',
          'open issues',
          'closed issues',
        ],
        datasets: [
          {
            label: 'issue',
            data: this.data,
            backgroundColor: [
              'rgba(255, 99, 132)',
              'rgba(153, 102, 255)',
              'rgba(255, 205, 86)',
              'rgb(88, 214, 141)',
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2,
        plugins: {
          title: {
            text: `Issues || (${this.issues.length})`,
            display: true,
          },
        },
      },
    };

    this.chart = new Chart('issues_pie_chart', this.config);
  }
}
