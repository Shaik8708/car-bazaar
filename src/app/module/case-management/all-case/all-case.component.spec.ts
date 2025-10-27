import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCaseComponent } from './all-case.component';

describe('AllCaseComponent', () => {
  let component: AllCaseComponent;
  let fixture: ComponentFixture<AllCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
