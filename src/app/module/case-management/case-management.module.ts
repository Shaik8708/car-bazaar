import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCaseComponent } from './add-case/add-case.component';
import { AllCaseComponent } from './all-case/all-case.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  {
    path: 'add-case/:id',
    component: AddCaseComponent,
  },
  {
    path: 'all-case',
    component: AllCaseComponent,
  }
];


@NgModule({
  declarations: [
    AddCaseComponent,
    AllCaseComponent
  ],
   imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      RouterModule.forChild(routes)
    ]
})
export class CaseManagementModule { }
