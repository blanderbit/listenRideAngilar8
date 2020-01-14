import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {StoreModule} from '@ngrx/store';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {TopMenuComponent} from './top-menu/top-menu.component';
import {AuthModule} from '@core/modules/auth/auth.module';

@NgModule({
  declarations: [MainComponent, TopMenuComponent],
  imports: [
    CommonModule,
    AuthModule,
    MainRoutingModule,
    StoreModule.forFeature('main', {}),
    MatGoogleMapsAutocompleteModule
  ],
  exports: [],
})
export class MainModule {
}
