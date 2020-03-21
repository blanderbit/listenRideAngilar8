import { Component, Input } from '@angular/core';
import { User } from '@models/user/user';

@Component({
  selector: 'lnr-settings-deactivate-account',
  templateUrl: './settings-deactivate-account.component.html',
  styleUrls: [
    '../settings-form.scss',
    './settings-deactivate-account.component.scss',
  ],
})
export class SettingsDeactivateAccountComponent {
  @Input() user: User;
}
