import { NgModule } from '@angular/core';
import { SupplierComponent } from './supplier.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: SupplierComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierRoutingModule {}
