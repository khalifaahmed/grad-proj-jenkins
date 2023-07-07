import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedByMeComponent } from './reported-by-me.component';

describe('ReportedByMeComponent', () => {
  let component: ReportedByMeComponent;
  let fixture: ComponentFixture<ReportedByMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportedByMeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportedByMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
