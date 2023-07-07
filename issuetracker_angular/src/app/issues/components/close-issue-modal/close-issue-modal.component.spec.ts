import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseIssueModalComponent } from './close-issue-modal.component';

describe('CloseIssueModalComponent', () => {
  let component: CloseIssueModalComponent;
  let fixture: ComponentFixture<CloseIssueModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseIssueModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseIssueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
