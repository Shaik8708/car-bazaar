import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsLeadsComponent } from './parts-leads.component';

describe('PartsLeadsComponent', () => {
  let component: PartsLeadsComponent;
  let fixture: ComponentFixture<PartsLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartsLeadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartsLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
