import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginLogoutLogsComponent } from './login-logout-logs/login-logout-logs.component';
const routes: Routes = [

  {
    path: 'login-logout-logs',
    component: LoginLogoutLogsComponent,
  },
  {
    path: 'login-logout-logs/:id',
    component: LoginLogoutLogsComponent,
  },
];

@NgModule({
  declarations: [
  LoginLogoutLogsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    
    RouterModule.forChild(routes)
  ]
})
export class LogsModule { }
