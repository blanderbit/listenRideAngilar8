import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {StoreModule} from '@ngrx/store';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {TopMenuComponent} from './top-menu/top-menu.component';
import {MaterialModule} from '../material.module';
import {FormsModule} from '@angular/forms';
import {AuthModule} from '@core/modules/auth/auth.module';
import {BikeTileMobileMapViewComponent} from './bike-tile/shared/bike-tile-mobile-map-view/bike-tile-mobile-map-view.component';
import {HomePageComponent} from './home-page/home-page.component';
import {LayoutModule} from '@core/modules/layout';
import {UserVerificationModule} from '@user-verification/user-verification.module';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {SharedModule} from '../shared/shared.module';
import {TopLocationComponent} from './home-page/shared/top-location/top-location.component';
import {PopularDestinationComponent} from './home-page/shared/popular-destination/popular-destination.component';
import {BikeTileSwiperComponent} from './home-page/shared/bike-tile-swiper/bike-tile-swiper.component';
import {BikeTileComponent} from './bike-tile/bike-tile.component';
import {SwiperModule} from 'ngx-swiper-wrapper';
import { SearchingFormComponent } from './home-page/shared/searching-form/searching-form.component';
import { BrandsSwiperComponent } from './home-page/shared/brands-swiper/brands-swiper.component';
import { TestimonialsSwiperComponent } from './home-page/shared/testimonials-swiper/testimonials-swiper.component';

@NgModule({
  declarations: [
    MainComponent,
    TopMenuComponent,
    ToolbarComponent,
    BikeTileMobileMapViewComponent,
    HomePageComponent,
    TopLocationComponent,
    PopularDestinationComponent,
    BikeTileComponent,
    BikeTileSwiperComponent,
    SearchingFormComponent,
    BrandsSwiperComponent,
    TestimonialsSwiperComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    UserVerificationModule,
    MainRoutingModule,
    MaterialModule,
    StoreModule.forFeature('main', {}),
    MatGoogleMapsAutocompleteModule,
    FormsModule,
    LayoutModule,
    SharedModule,
    SwiperModule
  ],
  exports: [
    BikeTileMobileMapViewComponent,
    BikeTileComponent
  ],
})
export class MainModule {
}
