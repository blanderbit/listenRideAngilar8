import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {AuthSignUpButtonComponent} from '@core/modules/auth/auth-sign-up/auth-sign-up-button/auth-sign-up-button.component';
import {AuthSignUpDialogComponent} from '@core/modules/auth/auth-sign-up/auth-sign-up-dialog/auth-sign-up-dialog.component';
import {AuthLoginButtonComponent} from '@core/modules/auth/auth-login/auth-login-button/auth-login-button.component';
import {AuthLoginFacebookButtonComponent} from '@core/modules/auth/shared/auth-login-facebook-button/auth-login-facebook-button.component';
import {AuthLoginDialogComponent} from '@core/modules/auth/auth-login/auth-login-dialog/auth-login-dialog.component';
// tslint:disable-next-line:max-line-length
import {AuthForgotPasswordButtonComponent} from '@core/modules/auth/auth-forgot-password/auth-forgot-password-button/auth-forgot-password-button.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AuthReducer} from '@core/modules/auth/store/reducers';
import {AuthEffects} from '@core/modules/auth/store/effects/auth.effects';
import {AuthLogoutButtonComponent} from '@core/modules/auth/auth-logout/auth-logout-button/auth-logout-button.component';

const buttons = [
  AuthSignUpButtonComponent,
  AuthLoginButtonComponent,
  AuthLogoutButtonComponent,
  AuthLoginFacebookButtonComponent,
  AuthForgotPasswordButtonComponent
];

const dialogs = [
  AuthSignUpDialogComponent,
  AuthLoginDialogComponent
];

@NgModule({
  declarations: [
    ...buttons,
    ...dialogs
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('auth', AuthReducer),
    EffectsModule.forFeature([AuthEffects])
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
