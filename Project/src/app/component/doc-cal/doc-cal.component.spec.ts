import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocCalComponent } from './doc-cal.component';

describe('DocCalComponent', () => {
  let component: DocCalComponent;
  let fixture: ComponentFixture<DocCalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocCalComponent]
    });
    fixture = TestBed.createComponent(DocCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
