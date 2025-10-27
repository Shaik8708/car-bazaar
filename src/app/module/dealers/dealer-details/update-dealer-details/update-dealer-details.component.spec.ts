import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDealerDetailsComponent } from './update-dealer-details.component';

describe('UpdateDealerDetailsComponent', () => {
  let component: UpdateDealerDetailsComponent;
  let fixture: ComponentFixture<UpdateDealerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDealerDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDealerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
