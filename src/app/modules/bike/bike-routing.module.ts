import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BikeComponent } from './bike-page/bike.component';

const routes: Routes = [
  { path: ':bikeId', component: BikeComponent },
  { path: '', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BikeRoutingModule {}
