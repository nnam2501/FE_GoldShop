import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientDashboardRoutingModule } from './client-dashboard-routing.module';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ClientDashboardComponent } from './client-dashboard.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductPageComponent } from './product-page/product-page.component';
import {
  NbLayoutModule,
  NbToastrModule,
  NbToastrService,
} from '@nebular/theme';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    ClientDashboardComponent,
    ProductDetailComponent,
    ProductPageComponent,
  ],
  imports: [
    CommonModule,
    ClientDashboardRoutingModule,
    NbToastrModule.forRoot(),
    NbLayoutModule,
  ],
  providers: [NbToastrService],
})
export class ClientDashboardModule {}
