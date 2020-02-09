import {NgModule} from '@angular/core';
import {SettingsProfileComponent} from './settings-profile.component';
import {SettingsProfileBioComponent} from './settings-profile-bio/settings-profile-bio.component';
import {SettingsProfileGeneralComponent} from './settings-profile-general/settings-profile-general.component';
import {SettingsProfileAddressComponent} from './settings-profile-address/settings-profile-address.component';
import {SettingsProfileInvoiceAddressComponent} from './settings-profile-invoice-address/settings-profile-invoice-address.component';
import {SettingsProfilePictureComponent} from './settings-profile-picture/settings-profile-picture.component';
import {SharedModule} from '../../../shared/shared.module';
import {PasswordUpdateComponent} from './shared/password-update/password-update.component';
import {PhoneUpdateComponent} from './shared/phone-update/phone-update.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {BsDropdownModule} from 'ngx-bootstrap';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import {AgmCoreModule} from '@agm/core';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {SettingsProfilePhoneComponent} from './settings-profile-phone/settings-profile-phone.component';
import {SettingsProfilePasswordComponent} from './settings-profile-password/settings-profile-password.component';
import {ProfilePictureComponent} from './shared/profile-picture/profile-picture.component';
import {ProfilePictureDialogComponent} from './shared/profile-picture/profile-picture-dialog/profile-picture-dialog.component';
import {PasswordUpdateDialogComponent} from './shared/password-update/password-update-dialog/password-update-dialog.component';
import {PhoneUpdateDialogComponent} from './shared/phone-update/phone-update-dialog/phone-update-dialog.component';

@NgModule({
  declarations: [
    SettingsProfileComponent,
    SettingsProfileBioComponent,
    SettingsProfileGeneralComponent,
    SettingsProfileAddressComponent,
    SettingsProfileInvoiceAddressComponent,
    SettingsProfilePictureComponent,
    SettingsProfilePhoneComponent,
    SettingsProfilePasswordComponent,
    PasswordUpdateComponent,
    PasswordUpdateDialogComponent,
    PhoneUpdateComponent,
    PhoneUpdateDialogComponent,
    ProfilePictureComponent,
    ProfilePictureDialogComponent,
  ],
  imports: [
    SharedModule,
    ImageCropperModule,
    BsDropdownModule.forRoot(),
    NgxIntlTelInputModule,
    AgmCoreModule,
    MatGoogleMapsAutocompleteModule,
  ],
  entryComponents: [
    ProfilePictureDialogComponent,
    PasswordUpdateDialogComponent,
    PhoneUpdateDialogComponent,
  ],
  exports: [
    SettingsProfileComponent
  ]
})
export class SettingsProfileModule {

}
