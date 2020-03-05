import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {AuthSignUpDialogComponent} from '@core/modules/auth/auth-sign-up/auth-sign-up-dialog/auth-sign-up-dialog.component';
import {AuthLoginDialogComponent} from '@core/modules/auth/auth-login/auth-login-dialog/auth-login-dialog.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import * as fromAuth from './store/reducers';
import {
  AuthApiEffects,
  AuthEffects,
  BusinessApiEffects,
  LoginDialogEffects,
  SignUpDialogEffects,
  UserApiEffects
} from '@auth/store/effects';

const dialogs = [
  AuthSignUpDialogComponent,
  AuthLoginDialogComponent,
];

@NgModule({
  declarations: [
    ...dialogs
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    EffectsModule.forFeature([
      AuthEffects,
      AuthApiEffects,
      BusinessApiEffects,
      LoginDialogEffects,
      SignUpDialogEffects,
      UserApiEffects
    ]),
  ],
  exports: [
    ...dialogs
  ],
  entryComponents: [
    ...dialogs
  ]
})
export class AuthModule {

}
