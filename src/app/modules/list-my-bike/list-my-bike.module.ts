import {NgModule} from '@angular/core';
import {ListMyBikeComponent} from './list-my-bike.component';
import {ListMyBikeRoutingModule} from './list-my-bike-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {UserResolver} from './service/resolver';
import {UserEditDataResolver} from './service/resolverEdit';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';

@NgModule({
  declarations: [
    ListMyBikeComponent
  ],
  imports: [
    ListMyBikeRoutingModule,
    MatGoogleMapsAutocompleteModule,
    SharedModule,
  ],
  entryComponents: [
    ListMyBikeComponent
  ],
  providers: [UserResolver, UserEditDataResolver]
})
export class ListMyBikeModule {

}
