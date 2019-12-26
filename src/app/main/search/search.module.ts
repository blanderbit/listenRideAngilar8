import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {SearchReducer} from "./store/search.reducers";
import {SearchRoutingModule} from "./search-routing.module";
import {SearchComponent} from "./search.component";
import {EffectsModule} from "@ngrx/effects";
import {SearchEffects} from "./store/search.effects";
import {AgmCoreModule} from "@agm/core";
import {environment} from "../../../environments/environment";
import {MatGoogleMapsAutocompleteModule} from "@angular-material-extensions/google-maps-autocomplete";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
    StoreModule.forFeature('search', SearchReducer),
    EffectsModule.forFeature([SearchEffects]),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMaps,
      libraries: ["places", "geometry"]
    }),
    MatGoogleMapsAutocompleteModule.forRoot(),
    InfiniteScrollModule
  ]
})
export class SearchModule { }
