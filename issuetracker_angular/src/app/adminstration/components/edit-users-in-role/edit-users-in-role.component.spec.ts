import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUsersInRoleComponent } from './edit-users-in-role.component';

describe('EditUsersInRoleComponent', () => {
  let component: EditUsersInRoleComponent;
  let fixture: ComponentFixture<EditUsersInRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUsersInRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUsersInRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
