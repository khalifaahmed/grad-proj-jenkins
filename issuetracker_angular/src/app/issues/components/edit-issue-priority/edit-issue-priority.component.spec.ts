import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIssuePriorityComponent } from './edit-issue-priority.component';

describe('EditIssuePriorityComponent', () => {
  let component: EditIssuePriorityComponent;
  let fixture: ComponentFixture<EditIssuePriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIssuePriorityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditIssuePriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
