import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealCancelledComponent } from './deal-cancelled.component';

describe('DealCancelledComponent', () => {
  let component: DealCancelledComponent;
  let fixture: ComponentFixture<DealCancelledComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DealCancelledComponent]
    });
    fixture = TestBed.createComponent(DealCancelledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
