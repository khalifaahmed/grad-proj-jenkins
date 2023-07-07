import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesPerMonthChartComponent } from './issues-per-month-chart.component';

describe('IssuesPerMonthChartComponent', () => {
  let component: IssuesPerMonthChartComponent;
  let fixture: ComponentFixture<IssuesPerMonthChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuesPerMonthChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuesPerMonthChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
