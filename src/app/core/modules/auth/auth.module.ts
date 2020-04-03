import { NgModule } from '@angular/core';
import { AuthSignUpDialogComponent } from '@core/modules/auth/auth-sign-up/auth-sign-up-dialog/auth-sign-up-dialog.component';
import { AuthLoginDialogComponent } from '@core/modules/auth/auth-login/auth-login-dialog/auth-login-dialog.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects, UserApiEffects } from '@auth/store/effects';
import { CommonModule } from '@angular/common';
import { SocialLoginModule } from 'angularx-social-login';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpErrorMessageModule } from '@shared/components/http-error-message/http-error-message.module';
import { ButtonsModule } from '@shared/components/buttons/buttons.module';
import { LoadersModule } from '@shared/components/loader/loaders.module';
import { DividersModule } from '@shared/components/dividers/dividers.module';
import { PipesModule } from '@shared/pipes/pipes.module';
import { DirectivesModule } from '@shared/directives/directives.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AuthLoginFormComponent } from '@auth/auth-login/auth-login-form/auth-login-form.component';
import { DialogsModule } from '@shared/dialogs/dialogs.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import * as fromAuth from './store/reducers';

const dialogs = [AuthSignUpDialogComponent, AuthLoginDialogComponent];

@NgModule({
  declarations: [AuthLoginFormComponent, ...dialogs],
  imports: [
    CommonModule,
    SocialLoginModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    HttpErrorMessageModule,
    ButtonsModule,
    LoadersModule,
    DialogsModule,
    DividersModule,
    PipesModule,
    DirectivesModule,
    NgxCaptchaModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    EffectsModule.forFeature([AuthEffects, UserApiEffects]),
    TranslateModule,
    MatIconModule,
  ],
  exports: [AuthLoginFormComponent, ...dialogs],
  entryComponents: [...dialogs],
})
export class AuthModule {}
