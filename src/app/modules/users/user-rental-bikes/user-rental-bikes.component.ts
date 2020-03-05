import {Component, Input} from '@angular/core';
import {User} from '@models/user/user';

@Component({
  selector: 'lnr-user-rental-bikes',
  templateUrl: './user-rental-bikes.component.html',
  styleUrls: ['./user-rental-bikes.component.scss']
})
export class UserRentalBikesComponent {
  @Input() user: User;
}
