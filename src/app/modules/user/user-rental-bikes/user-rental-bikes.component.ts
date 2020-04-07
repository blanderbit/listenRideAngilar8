import { Component, Input } from '@angular/core';
import { User } from '@models/user/user';
import { Bike } from '@models/bike/bike.types';
import slice from 'lodash-es/slice';

@Component({
  selector: 'lnr-user-rental-bikes',
  templateUrl: './user-rental-bikes.component.html',
  styleUrls: ['./user-rental-bikes.component.scss'],
})
export class UserRentalBikesComponent {
  @Input() user: User;
  showAll: boolean = false;

  displayableBikes(): Array<Bike> {
    return this.showAll ? this.user.rides : slice(this.user.rides, 0, 8);
  }

  showMore() {
    this.showAll = true;
  }

  showLess() {
    this.showAll = false;
  }
}
