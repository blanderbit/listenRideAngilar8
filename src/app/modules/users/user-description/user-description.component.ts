import { Component, Input } from '@angular/core';
import { User } from '@models/user/user';

@Component({
  selector: 'lnr-user-description',
  templateUrl: './user-description.component.html',
  styleUrls: ['./user-description.component.scss'],
})
export class UserDescriptionComponent {
  @Input() user: User;
}
