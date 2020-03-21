import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RatingModule } from 'ngx-bootstrap';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersResolver } from './users.resolver';
import { UserVerifiedThroughComponent } from './user-verified-through/user-verified-through.component';
import { UserAvailabilityComponent } from './user-availability/user-availability.component';
import { UserDescriptionComponent } from './user-description/user-description.component';
import { UserRentalBikesComponent } from './user-rental-bikes/user-rental-bikes.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserVerifiedThroughComponent,
    UserAvailabilityComponent,
    UserDescriptionComponent,
    UserRentalBikesComponent,
  ],
  imports: [SharedModule, UsersRoutingModule, RatingModule],
  providers: [UsersResolver],
})
export class UsersModule {}
