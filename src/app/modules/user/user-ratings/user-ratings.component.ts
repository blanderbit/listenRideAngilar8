import { Component, Input } from '@angular/core';
import { User, Rating } from '@models/user/user';
import slice from 'lodash-es/slice';

@Component({
  selector: 'lnr-user-ratings',
  templateUrl: './user-ratings.component.html',
  styleUrls: ['./user-ratings.component.scss'],
})
export class UserRatingsComponent {
  @Input() user: User;
  Arr = Array;
  showAll: boolean = false;

  displayableRatings(): Array<Rating> {
    return this.showAll ? this.user.ratings : slice(this.user.ratings, 0, 3);
  }

  showMore() {
    this.showAll = true;
  }

  showLess() {
    this.showAll = false;
  }
}
