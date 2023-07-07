import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRolesForUserModalComponent } from './edit-roles-for-user-modal.component';

describe('EditRolesForUserModalComponent', () => {
  let component: EditRolesForUserModalComponent;
  let fixture: ComponentFixture<EditRolesForUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRolesForUserModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRolesForUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
