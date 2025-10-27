import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from 'src/app/core/loader/loader.component';
import { SignupComponent } from '../signup/signup.component';
import { MaintenanceComponent } from '../maintenance/maintenance.component';
import { LockScreenComponent } from '../lock-screen/lock-screen.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'maintenance',
    component: MaintenanceComponent,
  },
  {
    path: 'lock-screen',
    component: LockScreenComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },

];

@NgModule({
  declarations: [LoginComponent,LoaderComponent,],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,


    RouterModule.forChild(routes)
  ]
})
export class LoginModule { }
