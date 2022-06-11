import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JewerlyComponent } from './jewerly.component';

const routes: Routes = [{ path: '', component: JewerlyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JewerlyRoutingModule {}
