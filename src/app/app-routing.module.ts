import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./module/leads/leads.module').then((m) => m.LeadsModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./module/logs/logs.module').then((m) => m.LogsModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./module/dealers/dealers.module').then((m) => m.DealersModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./module/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./module/employees/employees.module').then(
        (m) => m.EmployeesModule
      ),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./module/case-management/case-management.module').then(
        (m) => m.CaseManagementModule
      ),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./module/blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./module/address/address.module').then((m) => m.AddressModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./module/dasboard/dasboard.module').then((m) => m.DasboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
