import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {SharedModule} from '../../shared/shared.module';
import {HomeRoutingModule} from './home-routing.module';
import {BikeCardSwiperComponent} from './shared/bike-card-swiper/bike-card-swiper.component';
import {BrandsSwiperComponent} from './shared/brands-swiper/brands-swiper.component';
import {OurProsComponent} from './shared/our-pros/our-pros.component';
import {PopularDestinationComponent} from './shared/popular-destination/popular-destination.component';
import {SearchingFormComponent} from './shared/searching-form/searching-form.component';
import {TestimonialsSwiperComponent} from './shared/testimonials-swiper/testimonials-swiper.component';
import {TopLocationComponent} from './shared/top-location/top-location.component';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {SwiperModule} from 'ngx-swiper-wrapper';
import { RecommendedDestinationsComponent } from './shared/recommended-destinations/recommended-destinations.component';
import { EventsSwiperComponent } from './shared/events-swiper/events-swiper.component';

@NgModule({
  declarations: [
    HomeComponent,
    BikeCardSwiperComponent,
    BrandsSwiperComponent,
    OurProsComponent,
    PopularDestinationComponent,
    SearchingFormComponent,
    TestimonialsSwiperComponent,
    TopLocationComponent,
    RecommendedDestinationsComponent,
    EventsSwiperComponent
  ],
  imports: [
    SharedModule,
    MatGoogleMapsAutocompleteModule,
    SwiperModule,
    HomeRoutingModule,
  ]
})
export class HomeModule {

}
