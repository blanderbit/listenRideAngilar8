import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListMyBikeComponent} from './list-my-bike.component';

const routes: Routes = [
  {path: '', component: ListMyBikeComponent},
  {path: ':id', component: ListMyBikeComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ListMyBikeRoutingModule {

}
