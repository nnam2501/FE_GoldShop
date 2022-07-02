import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailDialogComponent } from 'src/app/admin/components/detail-dialog/detail-dialog.component';
import { OrderComponent } from './order.component';

const routes: Routes = [
  { path: '', component: OrderComponent },
  { path: 'order-detail/:id', component: DetailDialogComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
