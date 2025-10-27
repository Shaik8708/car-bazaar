import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotRespondingComponent } from './not-responding.component';

describe('NotRespondingComponent', () => {
  let component: NotRespondingComponent;
  let fixture: ComponentFixture<NotRespondingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotRespondingComponent]
    });
    fixture = TestBed.createComponent(NotRespondingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
