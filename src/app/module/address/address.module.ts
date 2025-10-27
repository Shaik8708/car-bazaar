import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddCityComponent } from './add-city/add-city.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [

  {
    path: 'add-city',
    component: AddCityComponent,
  }

];

@NgModule({
  declarations: [
    // AddCityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes)
  ]
})
export class AddressModule { }
