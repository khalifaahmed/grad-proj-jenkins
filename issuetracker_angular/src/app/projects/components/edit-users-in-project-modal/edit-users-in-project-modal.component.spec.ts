import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUsersInProjectModalComponent } from './edit-users-in-project-modal.component';

describe('EditUsersInProjectModalComponent', () => {
  let component: EditUsersInProjectModalComponent;
  let fixture: ComponentFixture<EditUsersInProjectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUsersInProjectModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUsersInProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
