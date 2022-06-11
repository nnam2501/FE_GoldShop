import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { VisionComponent } from './vision/vision.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { ShowroomsComponent } from './showrooms/showrooms.component';
import { BannerComponent } from './banner/banner.component';
import { CollectionsComponent } from './collections/collections.component';

@NgModule({
  declarations: [
    HomeComponent,
    VisionComponent,
    SolutionsComponent,
    ShowroomsComponent,
    BannerComponent,
    ShowroomsComponent,
    CollectionsComponent,
  ],
  imports: [CommonModule, MatCardModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
