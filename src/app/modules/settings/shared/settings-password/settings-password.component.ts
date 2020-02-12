import {Component, Input} from '@angular/core';
import {User} from '@models/user/user';

@Component({
  selector: 'lnr-settings-password',
  templateUrl: './settings-password.component.html',
  styleUrls: ['../settings-form.scss', './settings-password.component.scss']
})
export class SettingsPasswordComponent {
  mode: 'view' | 'update' = 'view';
  @Input() user: User;

  openView() {
    this.mode = 'view';
  }

  openUpdate() {
    this.mode = 'update';
  }
}
