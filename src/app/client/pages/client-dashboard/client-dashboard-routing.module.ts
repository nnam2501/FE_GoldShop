import { NgModule } from '@angular/core';
import { ClientDashboardComponent } from './client-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ChartGoldRateComponent } from '../chart-gold-rate/chart-gold-rate.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: ClientDashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'chart-gold-rate', component: ChartGoldRateComponent },
      // {
      //   path: 'products',
      //   loadChildren: () =>
      //     import('./client-product/client-product.module').then(
      //       (m) => m.ClientProductModule
      //     ),
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientDashboardRoutingModule {}
