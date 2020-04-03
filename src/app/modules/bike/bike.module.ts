import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { BikeRoutingModule } from './bike-routing.module';
import { BikeComponent } from './bike-page/bike.component';
import { BikeImagesSwiperComponent } from './bike-page/bike-images-swiper/bike-images-swiper.component';
import { SettingsProfileModule } from '../settings/settings-profile';
import { BookingModalComponent } from './bike-page/booking-modal/booking-modal.component';
import { BookingSnackbarComponent } from './bike-page/booking-snackbar/booking-snackbar.component';
import { BikeDescriptionBlockComponent } from './bike-page/bike-description-block/bike-description-block.component';

@NgModule({
  declarations: [
    BikeComponent,
    BikeImagesSwiperComponent,
    BookingModalComponent,
    BookingSnackbarComponent,
    BikeDescriptionBlockComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BikeRoutingModule,
    SettingsProfileModule,
  ],
  entryComponents: [BookingModalComponent],
  exports: [BookingSnackbarComponent],
})
export class BikeModule {}
