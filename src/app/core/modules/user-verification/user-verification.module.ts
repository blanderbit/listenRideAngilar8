import { NgModule } from '@angular/core';
import { UserVerificationDialogComponent } from '@core/modules/user-verification/user-verification-dialog/user-verification-dialog.component';
import { UserVerificationAddressComponent } from '@core/modules/user-verification/user-verification-address/user-verification-address.component';
import { UserVerificationEmailComponent } from '@core/modules/user-verification/user-verification-email/user-verification-email.component';
import { UserVerificationStartComponent } from '@user-verification/user-verification-start/user-verification-start.component';
import { UserVerificationPhoneComponent } from '@core/modules/user-verification/user-verification-phone/user-verification-phone.component';
import { UserVerificationLogoComponent } from '@core/modules/user-verification/user-verification-logo/user-verification-logo.component';
import { UserVerificationVatComponent } from '@core/modules/user-verification/user-verification-vat/user-verification-vat.component';
import { EffectsModule } from '@ngrx/effects';
import { UserVerificationEffects } from '@core/modules/user-verification/store/effects/user-verification.effects';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { HttpErrorMessageModule } from '@shared/components/http-error-message/http-error-message.module';
import { ButtonsModule } from '@shared/components/buttons/buttons.module';
import { LoadersModule } from '@shared/components/loader/loaders.module';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { ViewTemplateModule } from '@core/modules/view-template';
import { AddressModule } from '@shared/components/address/address.module';
import { ProfilePictureModule } from '@shared/components/profile-picture/profile-picture.module';
import { DirectivesModule } from '@shared/directives/directives.module';
import { OtpVerificationModule } from '@shared/components/otp-verification/otp-verification.module';
import { PipesModule } from '@shared/pipes/pipes.module';
import { PhoneVerificationModule } from '@shared/components/phone-verification/phone-verification.module';
import * as fromUserVerification from './store/reducers';

const components = [
  UserVerificationAddressComponent,
  UserVerificationEmailComponent,
  UserVerificationStartComponent,
  UserVerificationLogoComponent,
  UserVerificationPhoneComponent,
  UserVerificationVatComponent,
];

const dialogs = [UserVerificationDialogComponent];

@NgModule({
  declarations: [...components, ...dialogs],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    HttpErrorMessageModule,
    ButtonsModule,
    LoadersModule,

    DeviceDetectorModule.forRoot(),
    ViewTemplateModule,
    AddressModule,
    ProfilePictureModule,
    PhoneVerificationModule,
    OtpVerificationModule,
    PipesModule,
    DirectivesModule,

    StoreModule.forFeature(
      fromUserVerification.userVerificationFeatureKey,
      fromUserVerification.reducers,
    ),
    EffectsModule.forFeature([UserVerificationEffects]),
  ],
  exports: [UserVerificationPhoneComponent],

  entryComponents: [...dialogs],
})
export class UserVerificationModule {}
