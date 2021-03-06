import { NgModule } from '@angular/core';
import { ClientDashboardComponent } from './client-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ChartGoldRateComponent } from '../chart-gold-rate/chart-gold-rate.component';
import { HomeComponent } from './home/home.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { UsersPagesComponent } from '../users-pages/users-pages.component';
import { CurrentRateComponent } from '../current-rate/current-rate.component';

const routes: Routes = [
  {
    path: '',
    component: ClientDashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
        data: { animation: 'isRight' },
      },
      {
        path: 'chart-gold-rate',
        component: ChartGoldRateComponent,
        data: { animation: 'isLeft' },
      },
      {
        path: 'current-rate',
        component: CurrentRateComponent,
        data: { animation: 'isRight' },
      },
      {
        path: 'products',
        component: ProductPageComponent,
        data: { animation: 'isLeft' },
      },
      {
        path: 'products/:id',
        component: ProductDetailComponent,
        data: { animation: 'isRight' },
      },
      { path: 'cart', component: CartComponent, data: { animation: 'isLeft' } },
      {
        path: 'user-info',
        component: UsersPagesComponent,
        data: { animation: 'isRight' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientDashboardRoutingModule {}
