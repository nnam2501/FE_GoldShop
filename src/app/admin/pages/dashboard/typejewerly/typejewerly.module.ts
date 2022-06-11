import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypejewerlyComponent } from './typejewerly.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
  NbCardModule,
  NbInputModule,
  NbLayoutModule,
  NbSelectModule,
} from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { TypejewerlyRoutingModule } from './typejewerly-routing.module';

@NgModule({
  declarations: [TypejewerlyComponent],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    NbInputModule,
    NbSelectModule,
    FormsModule,
    TypejewerlyRoutingModule,
    NbLayoutModule,
    NbCardModule,
  ],
})
export class TypejewerlyModule {}
