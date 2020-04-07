import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { BikeCardSwiperComponent } from './shared/bike-card-swiper/bike-card-swiper.component';
import { BrandsSwiperComponent } from './shared/brands-swiper/brands-swiper.component';
import { OurProsComponent } from './shared/our-pros/our-pros.component';
import { PopularDestinationComponent } from './shared/popular-destination/popular-destination.component';
import { SearchingFormComponent } from './shared/searching-form/searching-form.component';
import { TestimonialsSwiperComponent } from './shared/testimonials-swiper/testimonials-swiper.component';
import { RecommendedDestinationsComponent } from './shared/recommended-destinations/recommended-destinations.component';
import { EventsSwiperComponent } from './shared/events-swiper/events-swiper.component';
import { RequestsThreeDSecureComponent } from './components/requests-three-dsecure/requests-three-dsecure.component';

@NgModule({
  declarations: [
    HomeComponent,
    BikeCardSwiperComponent,
    BrandsSwiperComponent,
    OurProsComponent,
    PopularDestinationComponent,
    SearchingFormComponent,
    TestimonialsSwiperComponent,
    RecommendedDestinationsComponent,
    EventsSwiperComponent,
    RequestsThreeDSecureComponent,
  ],
  exports: [TestimonialsSwiperComponent, EventsSwiperComponent],
  imports: [SharedModule, MatGoogleMapsAutocompleteModule, HomeRoutingModule],
  entryComponents: [RequestsThreeDSecureComponent],
})
export class HomeModule {}
