import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotExistComponent } from './not-exist.component';

describe('NotExistComponent', () => {
  let component: NotExistComponent;
  let fixture: ComponentFixture<NotExistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotExistComponent]
    });
    fixture = TestBed.createComponent(NotExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
