import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLogoutLogsComponent } from './login-logout-logs.component';

describe('LoginLogoutLogsComponent', () => {
  let component: LoginLogoutLogsComponent;
  let fixture: ComponentFixture<LoginLogoutLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginLogoutLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginLogoutLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
