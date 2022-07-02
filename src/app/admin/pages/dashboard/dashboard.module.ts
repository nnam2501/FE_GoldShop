import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
// import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import {
  NbActionsModule,
  NbButton,
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
    // BrowserModule,
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
