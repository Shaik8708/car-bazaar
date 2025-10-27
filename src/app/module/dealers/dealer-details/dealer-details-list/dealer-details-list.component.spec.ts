import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerDetailsListComponent } from './dealer-details-list.component';

describe('DealerDetailsListComponent', () => {
  let component: DealerDetailsListComponent;
  let fixture: ComponentFixture<DealerDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealerDetailsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
