import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { StoreModule } from "@ngrx/store";
import {MatGoogleMapsAutocompleteModule} from "@angular-material-extensions/google-maps-autocomplete";

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    StoreModule.forFeature('main', {}),
    MatGoogleMapsAutocompleteModule
  ],
  exports: [],
})
export class MainModule { }
