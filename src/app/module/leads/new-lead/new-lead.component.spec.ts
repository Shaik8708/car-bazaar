import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLeadComponent } from './new-lead.component';

describe('NewLeadComponent', () => {
  let component: NewLeadComponent;
  let fixture: ComponentFixture<NewLeadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewLeadComponent]
    });
    fixture = TestBed.createComponent(NewLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
