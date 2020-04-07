import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RatingModule } from 'ngx-bootstrap';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { UserVerifiedThroughComponent } from './user-verified-through/user-verified-through.component';
import { UserAvailabilityComponent } from './user-availability/user-availability.component';
import { UserRentalBikesComponent } from './user-rental-bikes/user-rental-bikes.component';
import { UserRatingsComponent } from './user-ratings/user-ratings.component';

@NgModule({
  declarations: [
    UserComponent,
    UserVerifiedThroughComponent,
    UserAvailabilityComponent,
    UserRentalBikesComponent,
    UserRatingsComponent,
  ],
  imports: [SharedModule, UserRoutingModule, RatingModule],
})
export class UserModule {}
