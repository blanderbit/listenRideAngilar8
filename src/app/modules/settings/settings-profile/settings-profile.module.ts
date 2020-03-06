import {NgModule} from '@angular/core';
import {SettingsProfileComponent} from './settings-profile.component';
import {SettingsBioComponent} from '../shared/settings-bio/settings-bio.component';
import {SettingsGeneralComponent} from '../shared/settings-general/settings-general.component';
import {SettingsAddressComponent} from '../shared/settings-address/settings-address.component';
import {SettingsInvoiceAddressComponent} from '../shared/settings-invoice-address/settings-invoice-address.component';
import {SettingsPictureComponent} from '../shared/settings-picture/settings-picture.component';
import {SharedModule} from '@shared/shared.module';
import {PasswordUpdateComponent} from '../shared/password-update/password-update.component';
import {PhoneUpdateComponent} from '../shared/phone-update/phone-update.component';
import {BsDropdownModule} from 'ngx-bootstrap';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import {AgmCoreModule} from '@agm/core';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {SettingsPhoneComponent} from '../shared/settings-phone/settings-phone.component';
import {SettingsPasswordComponent} from '../shared/settings-password/settings-password.component';
import {PasswordUpdateDialogComponent} from '../shared/password-update/password-update-dialog/password-update-dialog.component';
import {PhoneUpdateDialogComponent} from '../shared/phone-update/phone-update-dialog/phone-update-dialog.component';
import {ProfilePictureComponent} from '@shared/components/profile-picture/profile-picture.component';

@NgModule({
  declarations: [
    SettingsProfileComponent,
    SettingsBioComponent,
    SettingsGeneralComponent,
    SettingsAddressComponent,
    SettingsInvoiceAddressComponent,
    SettingsPictureComponent,
    SettingsPhoneComponent,
    SettingsPasswordComponent,
    PasswordUpdateComponent,
    PasswordUpdateDialogComponent,
    PhoneUpdateComponent,
    PhoneUpdateDialogComponent
  ],
  imports: [
    SharedModule,
    BsDropdownModule.forRoot(),
    NgxIntlTelInputModule,
    AgmCoreModule,
    MatGoogleMapsAutocompleteModule
  ],
  entryComponents: [PasswordUpdateDialogComponent, PhoneUpdateDialogComponent],
  exports: [SettingsProfileComponent, ProfilePictureComponent]
})
export class SettingsProfileModule {}
