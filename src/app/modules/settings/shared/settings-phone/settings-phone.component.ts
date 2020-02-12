import {Component, Input} from '@angular/core';
import {User} from '@models/user/user';

@Component({
  selector: 'lnr-settings-phone',
  templateUrl: './settings-phone.component.html',
  styleUrls: ['../settings-form.scss', './settings-phone.component.scss']
})
export class SettingsPhoneComponent {
  mode: 'view' | 'update' = 'view';
  @Input() user: User;

  openView() {
    this.mode = 'view';
  }

  openUpdate() {
    this.mode = 'update';
  }
}
