import {NgModule} from '@angular/core';
import {UserVerificationDialogComponent} from '@core/modules/user-verification/user-verification-dialog/user-verification-dialog.component';
import {UserVerificationAddressComponent} from '@core/modules/user-verification/user-verification-address/user-verification-address.component';
import {UserVerificationEmailComponent} from '@core/modules/user-verification/user-verification-email/user-verification-email.component';
import {UserVerificationStartComponent} from '@user-verification/user-verification-start/user-verification-start.component';
import {UserVerificationPhoneComponent} from '@core/modules/user-verification/user-verification-phone/user-verification-phone.component';
import {UserVerificationLogoComponent} from '@core/modules/user-verification/user-verification-logo/user-verification-logo.component';
import {UserVerificationVatComponent} from '@core/modules/user-verification/user-verification-vat/user-verification-vat.component';
import {SharedModule} from '../../../shared/shared.module';
import {ImageCropperModule} from 'ngx-image-cropper';
import {BsDropdownModule} from 'ngx-bootstrap';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import {AgmCoreModule} from '@agm/core';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {EffectsModule} from '@ngrx/effects';
import {UserVerificationEffects} from '@core/modules/user-verification/store/effects/user-verification.effects';
import {StoreModule} from '@ngrx/store';
import * as fromUserVerification from './store/reducers';
import {RouterModule} from '@angular/router';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {ViewTemplateModule} from '@core/modules/view-template';

const components = [
  UserVerificationAddressComponent,
  UserVerificationEmailComponent,
  UserVerificationStartComponent,
  UserVerificationLogoComponent,
  UserVerificationPhoneComponent,
  UserVerificationVatComponent,
];

const dialogs = [
  UserVerificationDialogComponent
];

@NgModule({
  declarations: [
    ...components,
    ...dialogs
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature(fromUserVerification.userVerificationFeatureKey, fromUserVerification.reducers),
    EffectsModule.forFeature([UserVerificationEffects]),
    ImageCropperModule,
    BsDropdownModule.forRoot(),
    NgxIntlTelInputModule,
    AgmCoreModule,
    MatGoogleMapsAutocompleteModule,
    RouterModule,
    DeviceDetectorModule.forRoot(),
    ViewTemplateModule
  ],

  entryComponents: [
    ...dialogs
  ]
})
export class UserVerificationModule {

}
