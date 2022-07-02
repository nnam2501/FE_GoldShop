import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbMenuService,
  NbSidebarModule,
  NbSidebarService,
  NbToastrModule,
  NbUserModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from '../../components/select/select.component';
import { FileinputComponent } from '../../components/fileinput/fileinput.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DetailDialogComponent } from '../../components/detail-dialog/detail-dialog.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SelectComponent,
    FileinputComponent,
    DialogComponent,
    DetailDialogComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NbLayoutModule,
    NbSidebarModule,
    NbEvaIconsModule,
    NbIconModule,
    NbActionsModule,
    NbUserModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,
    NbMenuModule.forRoot(),
    NbToastrModule.forRoot(),
    NbDialogModule.forRoot(),
  ],
  providers: [NbSidebarService, NbMenuService],
})
export class DashboardModule {}
