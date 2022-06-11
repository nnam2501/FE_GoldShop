import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JewerlyRoutingModule } from './jewerly-routing.module';
import { JewerlyComponent } from './jewerly.component';
import { FormsModule } from '@angular/forms';
import { NbInputModule, NbSelectModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [JewerlyComponent],
  imports: [
    CommonModule,
    JewerlyRoutingModule,
    FormsModule,
    NbInputModule,
    NbSelectModule,
    Ng2SmartTableModule,
  ],
})
export class JewerlyModule {}
