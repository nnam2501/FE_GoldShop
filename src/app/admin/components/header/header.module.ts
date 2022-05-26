import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  NbSidebarModule,
  NbLayoutModule,
  NbButtonModule,
} from '@nebular/theme';

@NgModule({
  declarations: [],
  imports: [RouterModule, NbLayoutModule, NbSidebarModule, NbButtonModule],
})
export class HeaderModule {}
