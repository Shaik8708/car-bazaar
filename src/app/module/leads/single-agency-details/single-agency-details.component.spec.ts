import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAgencyDetailsComponent } from './single-agency-details.component';

describe('SingleAgencyDetailsComponent', () => {
  let component: SingleAgencyDetailsComponent;
  let fixture: ComponentFixture<SingleAgencyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleAgencyDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleAgencyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
