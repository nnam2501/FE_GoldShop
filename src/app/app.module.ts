import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbSidebarService,
  NbMenuModule,
  NbMenuService,
  NbIconModule,
  NbToastrModule,
  NbDialogModule,
  NbCardModule,
  NbButtonModule,
  NbActionsModule,
  NbUserModule,
  NbInputModule,
  NbCheckboxModule,
  NbSelectModule,
} from '@nebular/theme';
import {
  NbPasswordAuthStrategy,
  NbAuthModule,
  NbAuthService,
} from '@nebular/auth';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { CurrentRateComponent } from './page/current-rate/current-rate.component';
import { ChartGoldRateComponent } from './client/pages/chart-gold-rate/chart-gold-rate.component';

import { LoginComponent } from './shared/pages/login/login.component';
import { RegisterComponent } from './shared/pages/register/register.component';

import { StoreModule } from '@ngrx/store';
import { CartComponent } from './client/pages/client-dashboard/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentRateComponent,
    ChartGoldRateComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbAuthModule.forRoot(),
    StoreModule.forRoot({}, {}),
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
