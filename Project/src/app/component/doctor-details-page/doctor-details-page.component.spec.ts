import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDetailsPageComponent } from './doctor-details-page.component';

describe('DoctorDetailsPageComponent', () => {
  let component: DoctorDetailsPageComponent;
  let fixture: ComponentFixture<DoctorDetailsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorDetailsPageComponent]
    });
    fixture = TestBed.createComponent(DoctorDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
