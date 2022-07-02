import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NbAuthComponent } from '@nebular/auth';

import { AuthGuard } from './auth/auth.guard';
import { UsersPagesComponent } from './client/pages/users-pages/users-pages.component';
import { LoginComponent } from './shared/pages/login/login.component';
import { RegisterComponent } from './shared/pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./client/pages/client-dashboard/client-dashboard.module').then(
        (m) => m.ClientDashboardModule
      ),
  },
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { animation: 'isRight' },
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: { animation: 'isLeft' },
      },
    ],
    data: { animation: 'isRight' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { animation: 'isLeft' },
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./admin/pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    data: { animation: 'isRight' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
