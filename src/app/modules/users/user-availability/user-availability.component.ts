import {Component, Input} from '@angular/core';
import {User} from '@models/user/user';

@Component({
  selector: 'lnr-user-availability',
  templateUrl: './user-availability.component.html',
  styleUrls: ['./user-availability.component.scss']
})
export class UserAvailabilityComponent {
  @Input() user: User;
}
