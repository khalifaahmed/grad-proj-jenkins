import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartDataset } from 'chart.js/auto';
import { ProjectDto } from 'src/app/projects/Dtos/ProjectDto';

@Component({
  selector: 'app-issues-by-project-chart',
  templateUrl: './issues-by-project-chart.component.html',
  styleUrls: ['./issues-by-project-chart.component.css'],
})
export class IssuesByProjectChartComponent implements OnInit {
  @Input() allProjects!: ProjectDto[];
  chart!: Chart;

  config!: ChartConfiguration;

  labels: string[] = [];
  datasets: ChartDataset[] = [];
  data: ChartDataset = {
    label: 'issues / project',
    data: [],
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    borderWidth: 2,
    cubicInterpolationMode: 'monotone',
  };

  ngOnInit(): void {
    for (const project of this.allProjects) {
      this.labels.push(project.name);
      this.data.data.push(project.issues.length);
    }
    this.datasets.push(this.data);

    // representaion data
    // this.labels = ['Test', 'Issue Tracker', 'Cuts clothing', 'Natours'];
    // this.datasets = [
    //   {
    //     label: 'issues / project',
    //     data: [30, 45, 22, 38],
    //     backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //     borderColor: 'rgb(255, 99, 132)',
    //     borderWidth: 2,
    //     cubicInterpolationMode: 'monotone',
    //   },
    // ];
    this.createChart();
  }

  createChart() {
    const allIssues: number = Number(
      this.datasets[0].data.reduce((a, b) => Number(a) + Number(b), 0)
    );
    this.config = {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: this.datasets,
      },
      options: {
        aspectRatio: 1.5,
        scales: {
          y: {
            type: 'linear',
            position: 'right',
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            text: `Issues Per Project   ||   All Issues (${allIssues})`,
            display: true,
          },
        },
      },
    };

    this.chart = new Chart('issues-by-project', this.config);
  }
}
