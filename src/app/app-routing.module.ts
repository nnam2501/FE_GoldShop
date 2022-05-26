import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';

import { CategoryComponent } from './admin/pages/category/category.component';
import { CustomerComponent } from './admin/pages/customer/customer.component';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { EmployeeComponent } from './admin/pages/employee/employee.component';
import { InvoiceComponent } from './admin/pages/invoice/invoice.component';
import { JewerlyComponent } from './admin/pages/jewerly/jewerly.component';
import { OrderComponent } from './admin/pages/order/order.component';
import { ReceiptComponent } from './admin/pages/receipt/receipt.component';
import { SupplierComponent } from './admin/pages/supplier/supplier.component';
import { TypejewerlyComponent } from './admin/pages/typejewerly/typejewerly.component';
import { LoginComponent } from './shared/pages/login/login.component';

const routes: Routes = [
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'employee', component: EmployeeComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'jewerly', component: JewerlyComponent },
      { path: 'type-jewerly', component: TypejewerlyComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'supplier', component: SupplierComponent },
      { path: 'order', component: OrderComponent },
      { path: 'invoice', component: InvoiceComponent },
      { path: 'receipt', component: ReceiptComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
