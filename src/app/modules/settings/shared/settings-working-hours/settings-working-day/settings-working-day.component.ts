import { Component } from '@angular/core';
import { workingHoursOptions } from './working-hours-options';

@Component({
  selector: 'lnr-settings-working-day',
  templateUrl: './settings-working-day.component.html',
  styleUrls: ['./settings-working-day.component.scss'],
})
export class SettingsWorkingDayComponent {
  hours = workingHoursOptions;
}
