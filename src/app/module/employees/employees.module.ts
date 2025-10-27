import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeesComponent } from './add-employees/add-employees.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';
import { EmployeedDetailsComponent } from './employeed-details/employeed-details.component';

const routes: Routes = [

  {
    path: 'employees',
    component: EmployeesListComponent,
  },
  {
    path: 'add-employees',
    component: AddEmployeesComponent,
  },

  {
    path: 'edit-employee/:id',
    component: AddEmployeesComponent,
  },
  {
    path: 'view-employee/:id',
    component: AddEmployeesComponent,
  },
];

@NgModule({
  declarations: [
    AddEmployeesComponent,
    EmployeesListComponent,
    EmployeedDetailsComponent,

    // SpinnerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    
    RouterModule.forChild(routes)
  ]
})

export class EmployeesModule { }
