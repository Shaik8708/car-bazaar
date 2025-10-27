import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskingHighPriceComponent } from './asking-high-price.component';

describe('AskingHighPriceComponent', () => {
  let component: AskingHighPriceComponent;
  let fixture: ComponentFixture<AskingHighPriceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AskingHighPriceComponent]
    });
    fixture = TestBed.createComponent(AskingHighPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
