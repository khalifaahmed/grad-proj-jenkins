import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashbordComponent } from './pages/dashbord/dashbord.component';
import { SharedModule } from '../shared/shared.module';
import { SortIssuesComponent } from './components/sort-issues/sort-issues.component';
import { SortIssuesChartComponent } from './components/sort-issues-chart/sort-issues-chart.component';
import { IssuesModule } from '../issues/issues.module';
import { IssuesByProjectChartComponent } from './components/issues-by-project-chart/issues-by-project-chart.component';
import { IssuesPerMonthChartComponent } from './components/issues-per-month-chart/issues-per-month-chart.component';

@NgModule({
  declarations: [
    DashbordComponent,
    SortIssuesComponent,
    SortIssuesChartComponent,
    IssuesByProjectChartComponent,
    IssuesPerMonthChartComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, IssuesModule],
})
export class DashboardModule {}
