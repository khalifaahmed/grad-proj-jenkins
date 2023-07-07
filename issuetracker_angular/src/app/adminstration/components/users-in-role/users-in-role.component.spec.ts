import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersInRoleComponent } from './users-in-role.component';

describe('UsersInRoleComponent', () => {
  let component: UsersInRoleComponent;
  let fixture: ComponentFixture<UsersInRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersInRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersInRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
