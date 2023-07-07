import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfullRegisterComponent } from './successfull-register.component';

describe('SuccessfullRegisterComponent', () => {
  let component: SuccessfullRegisterComponent;
  let fixture: ComponentFixture<SuccessfullRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfullRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessfullRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
