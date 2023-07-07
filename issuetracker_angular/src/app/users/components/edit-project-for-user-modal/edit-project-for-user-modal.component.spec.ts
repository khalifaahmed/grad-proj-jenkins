import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectForUserModalComponent } from './edit-project-for-user-modal.component';

describe('EditProjectForUserModalComponent', () => {
  let component: EditProjectForUserModalComponent;
  let fixture: ComponentFixture<EditProjectForUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProjectForUserModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProjectForUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
