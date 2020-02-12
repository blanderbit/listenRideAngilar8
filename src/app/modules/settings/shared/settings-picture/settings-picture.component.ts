import {Component, Input} from '@angular/core';
import {User} from '@models/user/user';

@Component({
  selector: 'lnr-settings-picture',
  templateUrl: './settings-picture.component.html',
  styleUrls: ['../settings-form.scss', './settings-picture.component.scss']
})
export class SettingsPictureComponent {
  @Input() user: User;

}
