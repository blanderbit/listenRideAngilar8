import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { SharedModule } from '@shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsAccountModule } from './settings-account';
import { SettingsAvailabilityModule } from './settings-availability';
import { SettingsProfileModule } from './settings-profile';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    SharedModule,
    SettingsRoutingModule,
    SettingsAccountModule,
    SettingsAvailabilityModule,
    SettingsProfileModule,
  ],
})
export class SettingsModule {}
