import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyBikesComponent } from './my-bikes.component';

const routes: Routes = [{ path: '', component: MyBikesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyBikesRoutingModule {}
