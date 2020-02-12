import {Component, Input} from '@angular/core';
import {User} from '@models/user/user';

@Component({
  selector: 'lnr-settings-newsletter',
  templateUrl: './settings-newsletter.component.html',
  styleUrls: ['../settings-form.scss', './settings-newsletter.component.scss']
})
export class SettingsNewsletterComponent {
  @Input() user: User;
}
