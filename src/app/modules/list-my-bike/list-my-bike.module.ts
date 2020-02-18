import {NgModule} from '@angular/core';
import {ListMyBikeComponent} from './list-my-bike.component';
import {ListMyBikeRoutingModule} from './list-my-bike-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {UserResolver} from './service/resolver';
import {UserEditDataResolver} from './service/resolverEdit';



@NgModule({
  declarations: [
    ListMyBikeComponent
  ],
  imports: [
    ListMyBikeRoutingModule,

    SharedModule,
  ],
  entryComponents: [
    ListMyBikeComponent
  ],
  providers:[UserResolver, UserEditDataResolver]
})
export class ListMyBikeModule {

}
