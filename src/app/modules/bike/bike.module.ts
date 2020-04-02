import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BikeRoutingModule } from './bike-routing.module';
import { BikeComponent } from './bike-page/bike.component';
import { BikeImagesSwiperComponent } from './bike-page/bike-images-swiper/bike-images-swiper.component';
import { SettingsProfileModule } from '../settings/settings-profile';
import { BookingModalComponent } from './bike-page/booking-modal/booking-modal.component';
import { BookingSnackbarComponent } from './bike-page/booking-snackbar/booking-snackbar.component';
import { BikeDescriptionBlockComponent } from './bike-page/bike-description-block/bike-description-block.component';
import { BikeBookingWidgetComponent } from './bike-booking-widget/bike-booking-widget.component';
import { PricesSectionComponent } from './bike-booking-widget/components/prices-section/prices-section.component';
import { BikeEffects } from './store/effects';
import { BikeReducer } from './store/reducer';
import { BIKE_FEATURE } from './store';
import { BookingOverviewComponent } from './bike-booking-widget/components/booking-overview/booking-overview.component';

@NgModule({
  declarations: [
    BikeComponent,
    BikeImagesSwiperComponent,
    BookingModalComponent,
    BookingSnackbarComponent,
    BikeDescriptionBlockComponent,
    BikeBookingWidgetComponent,
    PricesSectionComponent,
    BookingOverviewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BikeRoutingModule,
    SettingsProfileModule,
    StoreModule.forFeature(BIKE_FEATURE, BikeReducer),
    EffectsModule.forFeature([BikeEffects]),
  ],
  entryComponents: [BookingModalComponent],
})
export class BikeModule {}
