import { Component, Input, OnInit } from '@angular/core';
import { ProjectDto } from 'src/app/projects/Dtos/ProjectDto';
import { SortedProjectIssuesDto } from '../../Dtos/SortedProjectIssuesDto';
import { Chart, ChartConfiguration, ChartDataset } from 'chart.js/auto';

@Component({
  selector: 'app-sort-issues-chart',
  templateUrl: './sort-issues-chart.component.html',
  styleUrls: ['./sort-issues-chart.component.css'],
})
export class SortIssuesChartComponent implements OnInit {
  @Input() allProjects!: ProjectDto[];
  config!: ChartConfiguration;
  chart!: Chart;
  sortedProjectsIssues: SortedProjectIssuesDto[] = [];
  labels: string[] = [];

  overdueDataset: ChartDataset = {
    label: 'Over due Issues',
    data: [],
    backgroundColor: 'rgba(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    borderWidth: 0,
  };

  unAssignedDataset: ChartDataset = {
    label: 'Un assigned issues',
    data: [],
    backgroundColor: 'rgba(255, 205, 86)',
    borderColor: 'rgb(255, 205, 86)',
    borderWidth: 0,
  };

  openDataset: ChartDataset = {
    label: 'Open issues',
    data: [],
    backgroundColor: 'rgba(153, 102, 255)',
    borderColor: 'rgba(153, 102, 255)',
    borderWidth: 0,
  };

  closedDataset: ChartDataset = {
    label: 'Closed issues',
    data: [],
    backgroundColor: 'rgba(88, 214, 141)',
    borderColor: 'rgba(88, 214, 141)',
    borderWidth: 0,
  };

  datasets: ChartDataset[] = [];

  ngOnInit(): void {
    for (const project of this.allProjects) {
      let _sortedProjectIssues: SortedProjectIssuesDto = {
        projectName: project.name,
        closedIssue: [],
        openIssues: [],
        overdueIssues: [],
        unAssignedIssues: [],
      };

      for (const issue of project.issues) {
        if (issue.status === 'Open') {
          _sortedProjectIssues.openIssues.push(issue);
        } else if (issue.status === 'Closed') {
          _sortedProjectIssues.closedIssue.push(issue);
        }

        if (
          issue.status === 'Open' &&
          new Date(issue.targetResolutionDate!) < new Date()
        ) {
          _sortedProjectIssues.overdueIssues.push(issue);
        }

        if (issue.assignedUsers.length === 0) {
          _sortedProjectIssues.unAssignedIssues.push(issue);
        }
      }

      this.sortedProjectsIssues.push(_sortedProjectIssues);
    }
    this.initializeChartInputs();
    this.createChart();
  }

  initializeChartInputs() {
    for (const project of this.sortedProjectsIssues) {
      this.labels.push(project.projectName);
      this.overdueDataset.data.push(project.overdueIssues.length);
      this.unAssignedDataset.data.push(project.unAssignedIssues.length);
      this.openDataset.data.push(project.openIssues.length);
      this.closedDataset.data.push(project.closedIssue.length);
    }

    this.datasets = [
      this.overdueDataset,
      this.unAssignedDataset,
      this.openDataset,
      this.closedDataset,
    ];

    // representation data
    this.labels = ['project 1', 'project 2', 'project 3', 'project 4'];
    this.datasets = [
      {
        label: 'Over due Issues',
        data: [11, 1, 7, 8],
        backgroundColor: 'rgba(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 0,
      },
      {
        label: 'Un assigned issues',
        data: [8, 13, 15, 17],
        backgroundColor: 'rgba(153, 102, 255)',
        borderColor: 'rgba(153, 102, 255)',
        borderWidth: 0,
      },
      {
        label: 'Open issues',
        data: [10, 18, 11, 5],
        backgroundColor: 'rgba(255, 205, 86)',
        borderColor: 'rgb(255, 205, 86)',
        borderWidth: 0,
      },
      {
        label: 'Closed issues',
        data: [15, 18, 21, 25],
        backgroundColor: 'rgba(88, 214, 141)',
        borderColor: 'rgba(88, 214, 141)',
        borderWidth: 0,
      },
    ];
  }

  createChart() {
    this.config = {
      type: 'bar',
      data: { datasets: this.datasets, labels: this.labels },
      options: {
        aspectRatio: 1.5,
        plugins: {
          title: {
            text: 'Sorted Issues Per Project',
            display: true,
          },
        },
      },
    };

    this.chart = new Chart('sorted-issues-chart', this.config);
  }
}
