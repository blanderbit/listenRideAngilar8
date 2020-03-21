import { NgModule } from '@angular/core';
import { SettingsWorkingHoursComponent } from '../shared/settings-working-hours/settings-working-hours.component';
import { SharedModule } from '../../../shared/shared.module';
import { SettingsAvailabilityComponent } from './settings-availability.component';
import { SettingsWorkingDayComponent } from '../shared/settings-working-hours/settings-working-day/settings-working-day.component';

@NgModule({
  declarations: [
    SettingsAvailabilityComponent,
    SettingsWorkingHoursComponent,
    SettingsWorkingDayComponent,
  ],
  imports: [SharedModule],
  exports: [SettingsAvailabilityComponent],
})
export class SettingsAvailabilityModule {}
