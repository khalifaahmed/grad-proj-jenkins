import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsIconComponent } from './notifications-icon.component';

describe('NotificationsIconComponent', () => {
  let component: NotificationsIconComponent;
  let fixture: ComponentFixture<NotificationsIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationsIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
