import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { VisionComponent } from './vision/vision.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { ShowroomsComponent } from './showrooms/showrooms.component';
import { BannerComponent } from './banner/banner.component';
import { CollectionsComponent } from './collections/collections.component';
import { HomeRoutingModule } from './home-routing.module';
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
  declarations: [
    HomeComponent,
    VisionComponent,
    SolutionsComponent,
    ShowroomsComponent,
    BannerComponent,
    ShowroomsComponent,
    CollectionsComponent,
    ProjectsComponent,
  ],
  imports: [CommonModule, MatCardModule, HomeRoutingModule],
})
export class HomeModule {}
