import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesByProjectChartComponent } from './issues-by-project-chart.component';

describe('IssuesByProjectChartComponent', () => {
  let component: IssuesByProjectChartComponent;
  let fixture: ComponentFixture<IssuesByProjectChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuesByProjectChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuesByProjectChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
