import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUsersInIssueComponent } from './edit-users-in-issue.component';

describe('EditUsersInIssueComponent', () => {
  let component: EditUsersInIssueComponent;
  let fixture: ComponentFixture<EditUsersInIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUsersInIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUsersInIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
