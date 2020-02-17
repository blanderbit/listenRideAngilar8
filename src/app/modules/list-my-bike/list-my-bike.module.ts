import {NgModule} from '@angular/core';
import {ListMyBikeComponent} from './list-my-bike.component';
import {ListMyBikeRoutingModule} from './list-my-bike-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {SomeErrorComponent} from "./error-bar/error-bar.component";


@NgModule({
  declarations: [
    ListMyBikeComponent,
    SomeErrorComponent
  ],
  imports: [
    ListMyBikeRoutingModule,
    SharedModule,
  ],
  entryComponents: [
    ListMyBikeComponent,
    SomeErrorComponent
  ]
})
export class ListMyBikeModule {

}
