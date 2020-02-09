import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {SearchReducer} from './store/search.reducers';
import {SearchRoutingModule} from './search-routing.module';
import {SearchComponent} from './search.component';
import {EffectsModule} from '@ngrx/effects';
import {SearchEffects} from './store/search.effects';
import {AgmCoreModule} from '@agm/core';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {SharedModule} from '../../shared/shared.module';
import {AgmJsMarkerClustererModule} from '@agm/js-marker-clusterer';
import {DeviceDetectorModule} from 'ngx-device-detector';


@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    SharedModule,
    SearchRoutingModule,
    StoreModule.forFeature('search', SearchReducer),
    EffectsModule.forFeature([SearchEffects]),
    AgmCoreModule,
    MatGoogleMapsAutocompleteModule,
    AgmJsMarkerClustererModule,
    InfiniteScrollModule,
    DeviceDetectorModule.forRoot(),
  ]
})
export class SearchModule {
}
