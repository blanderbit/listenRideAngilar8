import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RequestsComponent } from '@modules/requests/requests.component';
import { UserResolver } from '@modules/list-my-bike/service/resolver';
import { BikeResolver } from '@modules/bikes-request-flow/service/bike-resolver';

const routes: Routes = [
  {
    path: ':id',
    component: RequestsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsRoutingModule {}
