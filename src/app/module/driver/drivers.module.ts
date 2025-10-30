import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ClipboardModule } from 'ngx-clipboard';
import { DriverListComponent } from './driver-list/driver-list.component';
import { AgencyListComponent } from './agency-list/agency-list.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: 'drivers',
    component: DriverListComponent,
  },
  {
    path: 'agencies',
    component: AgencyListComponent,
  },
  {
    path: 'users',
    component: UserListComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    ClipboardModule,
    RouterModule.forChild(routes),
  ],
})
export class DriversModule {}
