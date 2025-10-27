import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallMeLaterComponent } from './call-me-later.component';

describe('CallMeLaterComponent', () => {
  let component: CallMeLaterComponent;
  let fixture: ComponentFixture<CallMeLaterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallMeLaterComponent]
    });
    fixture = TestBed.createComponent(CallMeLaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
