import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PressComponent } from './press.component';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [{ path: '', component: PressComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class PressRoutingModule {}
