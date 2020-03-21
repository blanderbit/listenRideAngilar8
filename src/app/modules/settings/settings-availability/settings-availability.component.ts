import { Component, Input } from '@angular/core';
import { User } from '@models/user/user';

@Component({
  selector: 'lnr-settings-availability',
  templateUrl: './settings-availability.component.html',
  styleUrls: ['./settings-availability.component.scss'],
})
export class SettingsAvailabilityComponent {
  @Input() user: User;
}
