import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedToDealerComponent } from './assigned-to-dealer.component';

describe('AssignedToDealerComponent', () => {
  let component: AssignedToDealerComponent;
  let fixture: ComponentFixture<AssignedToDealerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignedToDealerComponent]
    });
    fixture = TestBed.createComponent(AssignedToDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
