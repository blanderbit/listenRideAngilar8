import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BikesRequestFlowComponent } from './bikes-request-flow.component';
import { BikeResolver } from './service/bike-resolver';
import { UserResolver } from './service/user-resolver';

const routes: Routes = [
  {
    path: '',
    component: BikesRequestFlowComponent,
    resolve: {
      bike: BikeResolver,
      user: UserResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BikesRequestFlowRoutingModule {}
