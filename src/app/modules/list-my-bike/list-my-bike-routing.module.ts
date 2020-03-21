import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMyBikeComponent } from './list-my-bike.component';
import { UserResolver } from './service/resolver';
import { UserEditDataResolver } from './service/resolverEdit';

const routes: Routes = [
  {
    path: '',
    component: ListMyBikeComponent,
    resolve: {
      user: UserResolver,
    },
  },
  {
    path: ':id',
    component: ListMyBikeComponent,
    resolve: {
      edit: UserEditDataResolver,
      user: UserResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListMyBikeRoutingModule {}
