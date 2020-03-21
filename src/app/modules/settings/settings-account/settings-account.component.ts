import { Component, Input } from '@angular/core';
import { User } from '@models/user/user';

@Component({
  selector: 'lnr-settings-account',
  templateUrl: './settings-account.component.html',
  styleUrls: ['./settings-account.component.scss'],
})
export class SettingsAccountComponent {
  @Input() user: User;
}
