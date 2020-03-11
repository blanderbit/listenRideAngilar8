import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@shared/shared.module';
import {BikesRoutingModule} from './bikes-routing.module';
import {BikeComponent} from './bike/bike.component';
import {BikeImagesSwiperComponent} from './bike/bike-images-swiper/bike-images-swiper.component';
import {SettingsProfileModule} from '../settings/settings-profile';
import {BookingModalComponent} from './bike/booking-modal/booking-modal.component';
import {BookingWidgetComponent} from './bike/booking-widget/booking-widget.component';
import {BookingSnackbarComponent} from './bike/booking-snackbar/booking-snackbar.component';
import {BikeDescriptionBlockComponent} from './bike/bike-description-block/bike-description-block.component';
import {MbscModule} from '@mobiscroll/angular';

@NgModule({
  declarations: [
    BikeComponent,
    BikeImagesSwiperComponent,
    BookingModalComponent,
    BookingWidgetComponent,
    BookingSnackbarComponent,
    BikeDescriptionBlockComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BikesRoutingModule,
    SettingsProfileModule,
    MbscModule
  ],
  exports:[BookingWidgetComponent],
  entryComponents: [BookingModalComponent]
})
export class BikesModule {}
