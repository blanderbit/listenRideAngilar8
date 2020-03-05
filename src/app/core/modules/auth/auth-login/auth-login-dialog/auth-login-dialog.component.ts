import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OauthTokenRequest} from '@models/oauth/oauth-token-request';
import {ApiOauthService} from '@api/api-oauth/api-oauth.service';
import {Subject} from 'rxjs';
import {OauthGrantTypeEnum} from '@enums/oauth-grant-type.enum';
import {select, Store} from '@ngrx/store';
import {LoginDialogActions} from '@core/modules/auth/store/actions';
import * as fromAuth from '../../store/reducers';
import {take, takeUntil} from 'rxjs/operators';
import {OauthTokenFacebookRequest} from '@models/oauth/oauth-token-facebook-request';
import {ApiUserService} from '@api/api-user/api-user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {DialogConfig} from '@core/configs/dialog/dialog.config';
import {MatDialog} from '@angular/material/dialog';
import {DialogSuccessData} from '../../../../../shared/dialogs/dialog-success/dialog-success-data';
import {DialogSuccessComponent} from '../../../../../shared/dialogs/dialog-success/dialog-success.component';
import {ValidatorsLnr} from '@validators/validators-lnr';

@Component({
  selector: 'lnr-auth-login-dialog',
  templateUrl: './auth-login-dialog.component.html',
  styleUrls: ['./auth-login-dialog.component.scss']
})
export class AuthLoginDialogComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();
  form: FormGroup;

  forgotPasswordPending = false;
  forgotPasswordError: HttpErrorResponse;

  socialUserPending = false;

  loginPending$ = this.store.pipe(select(fromAuth.selectLoginDialogPending));
  loginError$ = this.store.pipe(select(fromAuth.selectLoginDialogError));

  loginFacebookPending$ = this.store.pipe(select(fromAuth.selectLoginFacebookPending));
  loginFacebookError$ = this.store.pipe(select(fromAuth.selectLoginFacebookError));

  get forgotPasswordTooltip(): string {
    return this.form.get('email').invalid ? 'Enter valid email' : null;
  }

  constructor(private fb: FormBuilder,
              private apiOauthService: ApiOauthService,
              private apiUserService: ApiUserService,
              private dialog: MatDialog,
              private store: Store<fromAuth.State>) {
  }

  ngOnInit(): void {
    this.form = this.getForm();
    this.loginPending$.pipe(takeUntil(this.destroyed$)).subscribe(pending => pending ? this.form.disable() : this.form.enable());
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const oauthTokenRequest: OauthTokenRequest = {...this.form.value};
    this.store.dispatch(LoginDialogActions.login({credentials: oauthTokenRequest}));
  }

  close() {
    this.store.dispatch(LoginDialogActions.close());
  }

  signInWithFB(): void {
    this.socialUserPending = true;

    this.apiOauthService.loginFacebook()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((user) => {
        if (user && user.authToken) {
          this.socialUserPending = false;

          const oauthTokenFacebookRequest: OauthTokenFacebookRequest = {
            assertion: user.authToken,
            grant_type: OauthGrantTypeEnum.ASSERTION
          };

          this.store.dispatch(LoginDialogActions.loginFacebook({oauthTokenFacebookRequest}));
        }
      }, (error) => {
        this.socialUserPending = false;
      });
  }

  forgotPassword() {
    if (this.form.get('email').invalid) {
      return;
    }

    this.forgotPasswordPending = true;
    this.forgotPasswordError = null;

    this.apiUserService.resetPassword(this.form.get('email').value)
      .pipe(take(1))
      .subscribe((res) => {
        this.forgotPasswordPending = false;
        this.openForgotPasswordSuccessDialog();
      }, (error) => {
        this.forgotPasswordPending = false;
        this.forgotPasswordError = error;
      });
  }

  private openForgotPasswordSuccessDialog() {
    const dialogSuccessData: DialogSuccessData = {
      title: 'Password was successfully changed',
      description: 'We\'ve just sent you a new password to your email address! It should arrive in the next few minutes.'
    };

    const dialogConfig = new DialogConfig('500px', dialogSuccessData);

    this.dialog.open(DialogSuccessComponent, dialogConfig);
  }


  private getForm() {
    const formControls = {
      email: ['', [Validators.required, ValidatorsLnr.email]],
      password: ['', Validators.required],
      grant_type: [OauthGrantTypeEnum.PASSWORD],
    };

    return this.fb.group({
      ...formControls
    });
  }
}
