import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SupplierComponent],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    Ng2SmartTableModule,
    FormsModule,
  ],
})
export class SupplierModule {}
