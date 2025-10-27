import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerAssignedLeadsComponent } from './dealer-assigned-leads.component';

describe('DealerAssignedLeadsComponent', () => {
  let component: DealerAssignedLeadsComponent;
  let fixture: ComponentFixture<DealerAssignedLeadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DealerAssignedLeadsComponent]
    });
    fixture = TestBed.createComponent(DealerAssignedLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
