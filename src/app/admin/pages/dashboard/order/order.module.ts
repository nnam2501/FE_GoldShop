import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbLayoutModule } from '@nebular/theme';
import { OrderComponent } from './order.component';
import { OrderRoutingModule } from './order-routing.module';

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    Ng2SmartTableModule,
    FormsModule,
    NbLayoutModule,
    NbCardModule,
  ],
})
export class OrderModule {}
