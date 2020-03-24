// TODO Fix to avoid eslint-disable (see below in file). This file is invalid!
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ApiOauthService } from '@api/api-oauth/api-oauth.service';
import { ApiUserService } from '@api/api-user/api-user.service';
import { take, takeUntil } from 'rxjs/operators';
import { OauthGrantTypeEnum } from '@enums/oauth-grant-type.enum';
import { DialogSuccessData } from '@shared/dialogs/dialog-success/dialog-success-data';
import { DialogConfig } from '@core/configs/dialog/dialog.config';
import { DialogSuccessComponent } from '@shared/dialogs/dialog-success/dialog-success.component';
import { ValidatorsLnr } from '@validators/validators-lnr';
import { OauthTokenRequest } from '@models/oauth/oauth-token-request';
import { AuthService } from '@auth/auth.service';
import { OauthTokenFacebookRequest } from '@models/oauth/oauth-token-facebook-request';
import { AuthSignUpDialogComponent } from '@auth/auth-sign-up/auth-sign-up-dialog/auth-sign-up-dialog.component';

@Component({
  selector: 'lnr-auth-login-form',
  templateUrl: './auth-login-form.component.html',
  styleUrls: ['./auth-login-form.component.scss'],
})
export class AuthLoginFormComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();

  form: FormGroup;

  pending = false;

  error: HttpErrorResponse;

  socialUserPending = false;

  socialUserError: HttpErrorResponse;

  loginFacebookPending = false;

  loginFacebookError: HttpErrorResponse;

  forgotPasswordPending = false;

  forgotPasswordError: HttpErrorResponse;

  @Input() largeSize = false;

  @Input() fireLogin$: Subject<boolean> = new Subject();

  @Input() fireForgotPassword$: Subject<boolean> = new Subject();

  @Output() loginPending = new EventEmitter<boolean>();

  @Output() loginSuccess = new EventEmitter<boolean>();

  @Output() loginError = new EventEmitter<HttpErrorResponse>();

  @Output() openSignUp = new EventEmitter<boolean>();

  @Output() valueValid = new EventEmitter<string>();

  @Output() valueInvalid = new EventEmitter<boolean>();
  @Input() isRequestFlow: boolean;

  get forgotPasswordTooltip(): string {
    return this.form.get('email').invalid ? 'Enter valid email' : null;
  }

  constructor(
    private fb: FormBuilder,
    private apiOauthService: ApiOauthService,
    private apiUserService: ApiUserService,
    private authService: AuthService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.form = this.getForm();

    this.form.valueChanges.subscribe(value => {
      if (!this.form.invalid) {
        this.valueValid.emit(value);
      } else {
        this.valueInvalid.emit(true);
      }
    });

    this.fireLogin$.pipe(takeUntil(this.destroyed$)).subscribe(val => {
      if (val) {
        this.login();
      }
    });

    this.fireForgotPassword$.pipe(takeUntil(this.destroyed$)).subscribe(val => {
      if (val) {
        this.forgotPassword();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  login() {
    if (this.form.invalid) {
      return;
    }

    const oauthTokenRequest: OauthTokenRequest = { ...this.form.value };

    this.pending = true;
    this.error = null;

    this.loginPending.emit(true);

    this.authService.getUser(oauthTokenRequest).subscribe(
      user => {
        this.pending = false;
        this.loginPending.emit(false);
        this.loginSuccess.emit(true);
        this.loginError.emit(null);
      },
      error => {
        this.pending = false;
        this.error = error;
        this.loginPending.emit(false);
        this.loginError.emit(error);
      },
    );
  }

  loginFB(): void {
    this.socialUserPending = true;

    this.apiOauthService
      .loginFacebook()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        socialUser => {
          if (socialUser && socialUser.authToken) {
            this.socialUserPending = false;

            const oauthTokenFacebookRequest: OauthTokenFacebookRequest = {
              assertion: socialUser.authToken,
              // eslint-disable-next-line @typescript-eslint/camelcase
              grant_type: OauthGrantTypeEnum.ASSERTION,
            };

            this.loginFacebookPending = true;
            this.loginFacebookError = null;

            this.authService.getUser(oauthTokenFacebookRequest).subscribe(
              user => {
                this.loginFacebookPending = false;
                this.loginSuccess.emit(true);
              },
              error => {
                this.loginFacebookPending = false;
                this.loginFacebookError = error;
                this.loginError.emit(error);
              },
            );
          }
        },
        error => {
          this.socialUserPending = false;
          this.socialUserError = error;
          this.loginError.emit(error);
        },
      );
  }

  forgotPassword() {
    if (this.form.get('email').invalid) {
      return;
    }

    this.forgotPasswordPending = true;
    this.forgotPasswordError = null;

    this.apiUserService
      .resetPassword(this.form.get('email').value)
      .pipe(take(1))
      .subscribe(
        res => {
          this.forgotPasswordPending = false;
          this.openForgotPasswordSuccessDialog();
        },
        error => {
          this.forgotPasswordPending = false;
          this.forgotPasswordError = error;
          this.loginError.emit(error);
        },
      );
  }

  notMemberYet() {
    this.openSignUp.emit(true);

    const dialogConfig = new DialogConfig('740px');

    this.dialog.open(AuthSignUpDialogComponent, dialogConfig);
  }

  private openForgotPasswordSuccessDialog() {
    const dialogSuccessData: DialogSuccessData = {
      title: 'Password was successfully changed',
      description:
        "We've just sent you a new password to your email address! It should arrive in the next few minutes.",
    };

    const dialogConfig = new DialogConfig('500px', dialogSuccessData);

    this.dialog.open(DialogSuccessComponent, dialogConfig);
  }

  private getForm() {
    const formControls = {
      email: ['', [Validators.required, ValidatorsLnr.email]],
      password: ['', Validators.required],
      // eslint-disable-next-line @typescript-eslint/camelcase
      grant_type: [OauthGrantTypeEnum.PASSWORD],
    };

    return this.fb.group({
      ...formControls,
    });
  }
}
