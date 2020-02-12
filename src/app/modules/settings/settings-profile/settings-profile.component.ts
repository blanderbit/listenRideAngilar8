import {Component, Input} from '@angular/core';
import {User} from '@models/user/user';

@Component({
  selector: 'lnr-settings-profile',
  templateUrl: './settings-profile.component.html',
  styleUrls: ['./settings-profile.component.scss']
})
export class SettingsProfileComponent {
  @Input() user: User;
}
