import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
import {MatIconModule} from '@angular/material/icon';
import {BikeTileComponent} from '../bike-tile/bike-tile.component';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {MainModule} from '../main.module';


@NgModule({
  declarations: [
    SearchComponent,
    BikeTileComponent
  ],
    imports: [
        CommonModule,
        SearchRoutingModule,
        SharedModule,
        MatIconModule,
        StoreModule.forFeature('search', SearchReducer),
        EffectsModule.forFeature([SearchEffects]),
        AgmCoreModule,
        MatGoogleMapsAutocompleteModule,
        AgmJsMarkerClustererModule,
        InfiniteScrollModule,
        DeviceDetectorModule.forRoot(),
        MainModule
    ]
})
export class SearchModule {
}
