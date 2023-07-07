import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortIssuesChartComponent } from './sort-issues-chart.component';

describe('SortIssuesChartComponent', () => {
  let component: SortIssuesChartComponent;
  let fixture: ComponentFixture<SortIssuesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortIssuesChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortIssuesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
