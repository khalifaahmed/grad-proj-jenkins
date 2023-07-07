import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueUsersComponent } from './issue-users.component';

describe('IssueUsersComponent', () => {
  let component: IssueUsersComponent;
  let fixture: ComponentFixture<IssueUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
