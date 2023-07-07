import { Component, Input, OnInit } from '@angular/core';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import { IssueDto } from 'src/app/issues/Dtos/IssueDto';

@Component({
  selector: 'app-issues-per-month-chart',
  templateUrl: './issues-per-month-chart.component.html',
  styleUrls: ['./issues-per-month-chart.component.css'],
})
export class IssuesPerMonthChartComponent implements OnInit {
  @Input() allIssues!: IssueDto[];
  chart!: Chart;
  config!: ChartConfiguration;

  labels: string[] = [];
  data: number[] = [];

  ngOnInit(): void {
    this.initializeData();
    this.createChart();
  }

  initializeData() {
    const priorDate = new Date(
      new Date().getTime() - 1 * 365 * 24 * 60 * 60 * 1000
    );
    let priorYear = priorDate.getFullYear();

    for (let i = 0; i < 13; i++) {
      let month = priorDate.getMonth() + i;

      if (month === 12) {
        priorYear += 1;
      }

      if (month > 11) {
        month -= 12;
      }

      this.labels.push(`${month + 1}-${priorYear}`);

      const issuesPerMonth = this.allIssues.filter(
        (issue) =>
          new Date(issue.createdOn).getMonth() === month &&
          new Date(issue.createdOn).getFullYear() === priorYear
      );

      this.data.push(issuesPerMonth.length);
    }
  }

  createChart() {
    this.data = [10, 11, 12, 13, 14, 18, 10, 12, 17, 12, 23, 33, 10];
    this.config = {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Issues / Month',
            data: this.data,
            borderColor: 'rgb(52, 152, 219)',
            borderWidth: 2,
            cubicInterpolationMode: 'monotone',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        aspectRatio: 2.5,
        plugins: {
          title: {
            display: true,
            text: `Issues Per Month`,
          },
        },
      },
    };

    this.chart = new Chart('issues-per-month', this.config);
  }
}
