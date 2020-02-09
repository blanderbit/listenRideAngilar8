import {NgModule} from '@angular/core';
import {UserVerificationDialogComponent} from '@core/modules/user-verification/user-verification-dialog/user-verification-dialog.component';
import {UserVerificationAddressComponent} from '@core/modules/user-verification/user-verification-address/user-verification-address.component';
import {UserVerificationEmailComponent} from '@core/modules/user-verification/user-verification-email/user-verification-email.component';
import {UserVerificationHomeComponent} from '@core/modules/user-verification/user-verification-home/user-verification-home.component';
import {UserVerificationPhoneComponent} from '@core/modules/user-verification/user-verification-phone/user-verification-phone.component';
import {UserVerificationLogoComponent} from '@core/modules/user-verification/user-verification-logo/user-verification-logo.component';
import {UserVerificationVatComponent} from '@core/modules/user-verification/user-verification-vat/user-verification-vat.component';
import {SharedModule} from '../../../shared/shared.module';
import {ImageCropperModule} from 'ngx-image-cropper';
import {BsDropdownModule} from 'ngx-bootstrap';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import {AgmCoreModule} from '@agm/core';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {UserVerificationButtonTempComponent} from '@core/modules/user-verification/user-verification-button-temp';
import {EffectsModule} from '@ngrx/effects';
import {UserVerificationEffects} from '@core/modules/user-verification/store/effects/user-verification.effects';
import {StoreModule} from '@ngrx/store';
import * as fromUserVerification from './store/reducers';
import {ListMyBikeButton} from "@user-verification/list-my-bike-button/list-my-bike-button";
import {RouterModule} from "@angular/router";

const buttons = [
  UserVerificationButtonTempComponent,
  ListMyBikeButton
];

const components = [
  UserVerificationAddressComponent,
  UserVerificationEmailComponent,
  UserVerificationHomeComponent,
  UserVerificationLogoComponent,
  UserVerificationPhoneComponent,
  UserVerificationVatComponent,
];

const dialogs = [
  UserVerificationDialogComponent
];

@NgModule({
  declarations: [
    ...buttons,
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
  ],
  exports: [
    ...buttons
  ],
  entryComponents: [
    ...dialogs
  ]
})
export class UserVerificationModule {

}
