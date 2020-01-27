import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {StoreModule} from '@ngrx/store';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {TopMenuComponent} from './top-menu/top-menu.component';
import {MaterialModule} from '../material.module';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {FormsModule} from '@angular/forms';
import {AuthModule} from '@core/modules/auth/auth.module';
import { BikeTileMobileMapViewComponent } from './bike-tile/shared/bike-tile-mobile-map-view/bike-tile-mobile-map-view.component';
import { HomePageComponent } from './home-page/home-page.component';
import {LayoutModule} from '@core/modules/layout';

@NgModule({
  declarations: [MainComponent, TopMenuComponent, ToolbarComponent, BikeTileMobileMapViewComponent, HomePageComponent],
  imports: [
    CommonModule,
    AuthModule,
    MainRoutingModule,
    MaterialModule,
    StoreModule.forFeature('main', {}),
    MatGoogleMapsAutocompleteModule,
    FormsModule,
    LayoutModule
  ],
    exports: [
        BikeTileMobileMapViewComponent
    ],
})
export class MainModule {
}
