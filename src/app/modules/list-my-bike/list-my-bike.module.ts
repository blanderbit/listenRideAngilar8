import {NgModule} from '@angular/core';
import {ListMyBikeComponent} from './list-my-bike.component';
import {ListMyBikeRoutingModule} from './list-my-bike-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    ListMyBikeComponent,
  ],
  imports: [
    SharedModule,
    ListMyBikeRoutingModule,
  ],
  entryComponents: [
    ListMyBikeComponent
  ]
})
export class ListMyBikeModule {

}