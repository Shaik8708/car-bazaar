import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { SalesComponent } from './sales/sales.component';
import { NgApexchartsModule } from 'ng-apexcharts';

const routes: Routes = [

  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
  },
  {
    path: 'sales',
    component: SalesComponent,
  },

];

@NgModule({
  declarations: [
    DashboardComponent,
    SalesComponent,
    AnalyticsComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    RouterModule.forChild(routes)
  ]
})
export class DasboardModule { }
