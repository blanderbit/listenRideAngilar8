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



@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    StoreModule.forFeature('search', SearchReducer),
    EffectsModule.forFeature([SearchEffects]),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMaps,
      libraries: ["places", "geometry"]
    })
  ]
})
export class SearchModule { }
