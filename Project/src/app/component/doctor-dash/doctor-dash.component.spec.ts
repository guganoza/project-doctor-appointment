import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDashComponent } from './doctor-dash.component';

describe('DoctorDashComponent', () => {
  let component: DoctorDashComponent;
  let fixture: ComponentFixture<DoctorDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorDashComponent]
    });
    fixture = TestBed.createComponent(DoctorDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
