import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { NbCardModule } from '@nebular/theme';

@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    FormsModule,
    CustomerRoutingModule,
    NbCardModule,
  ],
})
export class CustomerModule {}
