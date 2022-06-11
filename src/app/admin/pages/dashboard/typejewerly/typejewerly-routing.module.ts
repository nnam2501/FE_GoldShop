import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TypejewerlyComponent } from './typejewerly.component';

const routes: Routes = [{ path: '', component: TypejewerlyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypejewerlyRoutingModule {}
