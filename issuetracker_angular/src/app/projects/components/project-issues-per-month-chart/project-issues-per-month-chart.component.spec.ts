import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectIssuesPerMonthChartComponent } from './project-issues-per-month-chart.component';

describe('ProjectIssuesPerMonthChartComponent', () => {
  let component: ProjectIssuesPerMonthChartComponent;
  let fixture: ComponentFixture<ProjectIssuesPerMonthChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectIssuesPerMonthChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectIssuesPerMonthChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
