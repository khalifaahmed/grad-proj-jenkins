import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectIssuesPieChartComponent } from './project-issues-pie-chart.component';

describe('ProjectIssuesPieChartComponent', () => {
  let component: ProjectIssuesPieChartComponent;
  let fixture: ComponentFixture<ProjectIssuesPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectIssuesPieChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectIssuesPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
