import {Component, Input} from '@angular/core';
import {User} from '@models/user/user';

@Component({
  selector: 'lnr-user-verified-through',
  templateUrl: './user-verified-through.component.html',
  styleUrls: ['./user-verified-through.component.scss']
})
export class UserVerifiedThroughComponent {
  @Input() user: User;
}
