import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDriverDetailsComponent } from './single-driver-details.component';

describe('SingleDriverDetailsComponent', () => {
  let component: SingleDriverDetailsComponent;
  let fixture: ComponentFixture<SingleDriverDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleDriverDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleDriverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
