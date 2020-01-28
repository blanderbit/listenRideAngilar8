import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {AuthSignUpButtonComponent} from '@core/modules/auth/auth-sign-up/auth-sign-up-button/auth-sign-up-button.component';
import {AuthSignUpDialogComponent} from '@core/modules/auth/auth-sign-up/auth-sign-up-dialog/auth-sign-up-dialog.component';
import {AuthLoginButtonComponent} from '@core/modules/auth/auth-login/auth-login-button/auth-login-button.component';
import {AuthLoginFacebookButtonComponent} from '@core/modules/auth/auth-login-facebook-button/auth-login-facebook-button.component';
import {AuthLoginDialogComponent} from '@core/modules/auth/auth-login/auth-login-dialog/auth-login-dialog.component';
import {AuthLogoutButtonComponent} from '@core/modules/auth/auth-logout-button/auth-logout-button.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from '@core/modules/auth/store/effects/auth.effects';
import * as fromAuth from './store/reducers';
import {ImageCropperModule} from 'ngx-image-cropper';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import {BsDropdownModule} from 'ngx-bootstrap';
import {AgmCoreModule} from '@agm/core';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {AuthForgotPasswordButtonComponent} from '@auth/auth-forgot-password/auth-forgot-password-button/auth-forgot-password-button.component';

const buttons = [
  AuthSignUpButtonComponent,
  AuthLoginButtonComponent,
  AuthLogoutButtonComponent,
  AuthForgotPasswordButtonComponent,
  AuthLoginFacebookButtonComponent,
];

const components = [];

const dialogs = [
  AuthSignUpDialogComponent,
  AuthLoginDialogComponent,
];

@NgModule({
  declarations: [
    ...buttons,
    ...components,
    ...dialogs
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    EffectsModule.forFeature([AuthEffects]),
    ImageCropperModule,
    BsDropdownModule.forRoot(),
    NgxIntlTelInputModule,
    AgmCoreModule,
    MatGoogleMapsAutocompleteModule,
  ],
  exports: [
    ...buttons,
    ...dialogs
  ],
  entryComponents: [
    ...dialogs
  ]
})
export class AuthModule {

}
