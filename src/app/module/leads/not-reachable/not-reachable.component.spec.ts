import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotReachableComponent } from './not-reachable.component';

describe('NotReachableComponent', () => {
  let component: NotReachableComponent;
  let fixture: ComponentFixture<NotReachableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotReachableComponent]
    });
    fixture = TestBed.createComponent(NotReachableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
