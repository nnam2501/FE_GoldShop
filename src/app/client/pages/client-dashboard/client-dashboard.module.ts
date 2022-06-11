import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ClientDashboardRoutingModule } from './client-dashboard-routing.module';
import { HeaderComponent } from '../../components/header/header.component';
import { VisionComponent } from './home/vision/vision.component';
import { SolutionsComponent } from './home/solutions/solutions.component';
import { ProjectsComponent } from './home/projects/projects.component';
import { ShowroomsComponent } from './home/showrooms/showrooms.component';
import { ProductsComponent } from './home/products/products.component';
import { CollectionsComponent } from './home/collections/collections.component';
import { BannerComponent } from './home/banner/banner.component';

import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ClientDashboardComponent } from './client-dashboard.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    ClientDashboardComponent,
  ],
  imports: [CommonModule, ClientDashboardRoutingModule],
})
export class ClientDashboardModule {}
