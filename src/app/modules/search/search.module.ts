import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { SharedModule } from '../../shared/shared.module';
import { SearchEffects } from './store/search.effects';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { SearchReducer } from './store/search.reducers';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    SharedModule,
    SearchRoutingModule,
    AgmCoreModule,
    MatGoogleMapsAutocompleteModule,
    AgmJsMarkerClustererModule,
    InfiniteScrollModule,
    DeviceDetectorModule.forRoot(),
  ],
})
export class SearchModule {}
