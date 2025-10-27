import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeedDetailsComponent } from './employeed-details.component';

describe('EmployeedDetailsComponent', () => {
  let component: EmployeedDetailsComponent;
  let fixture: ComponentFixture<EmployeedDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeedDetailsComponent]
    });
    fixture = TestBed.createComponent(EmployeedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
