import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbSidebarService,
  NbMenuModule,
  NbMenuService,
  NbIconModule,
  NbToastrModule,
  NbDialogModule,
  NbCardModule,
  NbButtonModule,
  NbActionsModule,
  NbUserModule,
  NbInputModule,
  NbCheckboxModule,
} from '@nebular/theme';
import { NbPasswordAuthStrategy, NbAuthModule } from '@nebular/auth';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { CurrentRateComponent } from './page/current-rate/current-rate.component';
import { ChartGoldRateComponent } from './page/chart-gold-rate/chart-gold-rate.component';
import { HeaderComponent } from './admin/components/header/header.component';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { EmployeeComponent } from './admin/pages/employee/employee.component';
import { CustomerComponent } from './admin/pages/customer/customer.component';
import { JewerlyComponent } from './admin/pages/jewerly/jewerly.component';
import { TypejewerlyComponent } from './admin/pages/typejewerly/typejewerly.component';
import { CategoryComponent } from './admin/pages/category/category.component';
import { SupplierComponent } from './admin/pages/supplier/supplier.component';
import { OrderComponent } from './admin/pages/order/order.component';
import { InvoiceComponent } from './admin/pages/invoice/invoice.component';
import { ReceiptComponent } from './admin/pages/receipt/receipt.component';
import { CancelDialogComponent } from './admin/components/cancel-dialog/cancel-dialog.component';
import { DialogComponent } from './admin/components/dialog/dialog.component';
import { LoginComponent } from './shared/pages/login/login.component';
import { RegisterComponent } from './shared/pages/register/register.component';
import { SelectComponent } from './admin/components/select/select.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentRateComponent,
    ChartGoldRateComponent,
    HeaderComponent,
    DashboardComponent,
    EmployeeComponent,
    CustomerComponent,
    JewerlyComponent,
    TypejewerlyComponent,
    CategoryComponent,
    SupplierComponent,
    OrderComponent,
    InvoiceComponent,
    ReceiptComponent,
    CancelDialogComponent,
    DialogComponent,
    LoginComponent,
    RegisterComponent,
    SelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    Ng2SmartTableModule,
    FormsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    NbSidebarModule,
    NbEvaIconsModule,
    NbIconModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbInputModule,
    NbMenuModule.forRoot(),
    NbToastrModule.forRoot(),
    NbDialogModule.forRoot(),
    NbAuthModule.forRoot(),
  ],
  // entryComponents: [SelectComponent],
  providers: [NbSidebarService, NbMenuService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
