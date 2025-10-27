import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerQuotationLeadsComponent } from './dealer-quotation-leads.component';

describe('DealerQuotationLeadsComponent', () => {
  let component: DealerQuotationLeadsComponent;
  let fixture: ComponentFixture<DealerQuotationLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealerQuotationLeadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerQuotationLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
