import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidatorsLnr} from '@validators/validators-lnr';
import {SignUpRequest} from '@models/sign-up/sign-up-request';
import {ReCaptchaV3Service} from 'ngx-captcha';
import {environment} from '@environment/environment';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SignUpFacebookRequest} from '@models/sign-up/sign-up-facebook-request';
import {ApiOauthService} from '@api/api-oauth/api-oauth.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '@auth/auth.service';
import {AuthLoginDialogComponent} from '@auth/auth-login/auth-login-dialog/auth-login-dialog.component';
import {DialogConfig} from '@core/configs/dialog/dialog.config';

type TabType = 'private' | 'business';

@Component({
  selector: 'lnr-auth-sign-up-dialog',
  templateUrl: './auth-sign-up-dialog.component.html',
  styleUrls: ['./auth-sign-up-dialog.component.scss']
})
export class AuthSignUpDialogComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();
  tabType: TabType = 'private';
  form: FormGroup;

  signUpPending = false;
  signUpError: HttpErrorResponse;

  socialUserPending = false;
  socialUserError: HttpErrorResponse;

  signUpFacebookPending = false;
  signUpFacebookError: HttpErrorResponse;

  get submitBtnTooltip(): string {
    return this.userForm.get('terms').invalid ? 'Agree our Terms and Conditions and Privacy policy' : null;
  }

  constructor(public dialogRef: MatDialogRef<AuthSignUpDialogComponent>,
              private fb: FormBuilder,
              private reCaptchaV3Service: ReCaptchaV3Service,
              private apiOauthService: ApiOauthService,
              private authService: AuthService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.form = this.getForm();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  signUp() {
    if ((this.showPrivate && this.userForm.invalid) || (this.showBusiness && (this.userForm.invalid || this.businessForm.invalid))) {
      return;
    }

    let signUpRequest: SignUpRequest = {
      ...this.form.value,
    };

    this.reCaptchaV3Service.execute(environment.LNR_API_RECAPTCHA_V3_PUBLIC, 'homepage', (token) => {
      signUpRequest = this.setReCaptchaToken(signUpRequest, token);
      signUpRequest = this.setIsShop(signUpRequest);

      const companyName = signUpRequest.is_shop ? signUpRequest.business.company_name : null;

      this.form.disable();

      this.signUpPending = true;
      this.signUpError = null;
      this.authService.signUp(signUpRequest, companyName)
        .subscribe((user) => {
          this.signUpPending = false;
          this.form.enable();
          this.close();
        }, (error) => {
          this.form.enable();
          this.signUpPending = false;
          this.signUpError = error;
        });
    });
  }


  signUpFB(): void {
    this.socialUserPending = true;
    let signUpRequest: SignUpRequest = {
      ...this.form.value,
    };

    signUpRequest = this.setIsShop(signUpRequest);

    this.apiOauthService.loginFacebook()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((socialUser) => {
        if (socialUser && socialUser.authToken) {
          this.socialUserPending = false;
          const signUpFacebookRequest: SignUpFacebookRequest = {
            user: {
              facebook_access_token: socialUser.authToken
            },
            is_shop: signUpRequest.is_shop,
            notification_preference: signUpRequest.notification_preference
          };

          const companyName = signUpRequest.is_shop ? signUpRequest.business.company_name : null;

          this.signUpFacebookPending = true;
          this.signUpFacebookError = null;

          this.form.disable();

          this.authService.signUpFB(signUpFacebookRequest, companyName)
            .subscribe((user) => {
              this.signUpFacebookPending = false;
              this.form.enable();
              this.close();
            }, (error) => {
              this.form.enable();
              this.signUpFacebookPending = false;
              this.signUpFacebookError = error;
            });
        }
      }, (error) => {
        this.socialUserPending = false;
        this.socialUserError = error;
      });
  }

  toggleTab(tab: TabType) {
    this.tabType = tab;
  }

  openLoginDialog() {
    const dialogConfig = new DialogConfig('400px');
    this.dialog.open(AuthLoginDialogComponent, dialogConfig);
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

  get showPrivate() {
    return this.tabType === 'private';
  }

  get showBusiness() {
    return this.tabType === 'business';
  }

  get businessForm(): AbstractControl | null {
    return this.form.get('business');
  }

  get userForm(): AbstractControl | null {
    return this.form.get('user');
  }

  private getForm() {
    const formControls = {
      business: this.fb.group(
        {
          company_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        }
      ),
      user: this.fb.group(
        {
          first_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          last_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
          email: ['', [Validators.required, ValidatorsLnr.email]],
          password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
          terms: [false, ValidatorsLnr.checkboxRequired],
          language: ['en']
        }
      ),
      notification_preference: this.fb.group(
        {
          newsletter: [true]
        }
      ),
      is_shop: [false],
      recaptcha_token: [null]
    };

    return this.fb.group({
      ...formControls
    });
  }

  private setReCaptchaToken(signUpRequest: SignUpRequest, token: string): SignUpRequest {
    signUpRequest.recaptcha_token = token;
    return signUpRequest;
  }

  private setIsShop(signUpRequest: SignUpRequest): SignUpRequest {
    signUpRequest.is_shop = this.tabType === 'business';
    return signUpRequest;
  }

}
