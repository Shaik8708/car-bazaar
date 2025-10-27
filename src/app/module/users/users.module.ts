import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllUsersComponent } from './all-users/all-users.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'users',
    component: AllUsersComponent,
  }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
