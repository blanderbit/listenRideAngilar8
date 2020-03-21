import { Component, Input } from '@angular/core';
import { User } from '@models/user/user';

@Component({
  selector: 'lnr-settings-notifications',
  templateUrl: './settings-notifications.component.html',
  styleUrls: [
    '../settings-form.scss',
    './settings-notifications.component.scss',
  ],
})
export class SettingsNotificationsComponent {
  @Input() user: User;
}
