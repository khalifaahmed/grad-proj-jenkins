import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortIssuesComponent } from './sort-issues.component';

describe('SortIssuesComponent', () => {
  let component: SortIssuesComponent;
  let fixture: ComponentFixture<SortIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortIssuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
