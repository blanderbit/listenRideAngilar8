import {Component, Input} from '@angular/core';
import {User} from '@models/user/user';

@Component({
  selector: 'lnr-settings-working-hours',
  templateUrl: './settings-working-hours.component.html',
  styleUrls: ['./settings-working-hours.component.scss']
})
export class SettingsWorkingHoursComponent {
  @Input() user: User;

  days = [0, 1, 2, 3, 4, 5, 6];
}
