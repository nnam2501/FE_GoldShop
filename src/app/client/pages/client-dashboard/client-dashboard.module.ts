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
  NbButtonGroupModule,
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbLayoutModule,
  NbRadioModule,
  NbToastrModule,
  NbToastrService,
} from '@nebular/theme';
import { ClientDialogComponent } from '../../components/client-dialog/client-dialog.component';
import { CurrentRateComponent } from '../current-rate/current-rate.component';
import { ChartGoldRateComponent } from '../chart-gold-rate/chart-gold-rate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    ClientDashboardComponent,
    ProductDetailComponent,
    ProductPageComponent,
    ClientDialogComponent,
    CurrentRateComponent,
    ChartGoldRateComponent,
  ],
  imports: [
    CommonModule,
    ClientDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbToastrModule.forRoot(),
    NbLayoutModule,
    NbDialogModule.forRoot(),
    NbCardModule,
    NbButtonModule,
    NbButtonGroupModule,
    NbRadioModule,
    NbCardModule,
  ],
  providers: [NbToastrService],
})
export class ClientDashboardModule {}
