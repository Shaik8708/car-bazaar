import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealAcceptedComponent } from './deal-accepted.component';

describe('DealAcceptedComponent', () => {
  let component: DealAcceptedComponent;
  let fixture: ComponentFixture<DealAcceptedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DealAcceptedComponent]
    });
    fixture = TestBed.createComponent(DealAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
