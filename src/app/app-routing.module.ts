import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NbAuthComponent } from '@nebular/auth';

import { AuthGuard } from './auth/auth.guard';
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
  // { path: 'chart-gold-rate', component: ChartGoldRateComponent },

  {
    path: '',
    component: NbAuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },

  {
    path: 'login',
    component: NbAuthComponent,
    children: [{ path: '', component: LoginComponent }],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./admin/pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
