import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidatorsLnr} from '@validators/validators-lnr';
import {SignUpRequest} from '@models/sign-up/sign-up-request';
import {ReCaptchaV3Service} from 'ngx-captcha';
import {environment} from '@environment/environment';
import {ApiUserService} from '@api/api-user/api-user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiBusinessService} from '@api/api-business/api-business.service';
import {BusinessCreateRequest} from '@models/business/business-create-request';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {AuthState} from '@core/modules/auth/store/reducers';
import {LoginWithCredentials} from '@core/modules/auth/store/actions/auth.actions';
import {OauthTokenRequest} from '@models/oauth/oauth-token-request';
import {OauthGrantTypeEnum} from '@enums/oauth-grant-type.enum';

enum TabsEnum {
  PRIVATE = 'PRIVATE',
  BUSINESS = 'BUSINESS',
}

@Component({
  selector: 'lnr-auth-sign-up-dialog',
  templateUrl: './auth-sign-up-dialog.component.html',
  styleUrls: ['./auth-sign-up-dialog.component.scss']
})
export class AuthSignUpDialogComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject();
  tab = TabsEnum.PRIVATE;
  TabsEnum = TabsEnum;
  form: FormGroup;
  loading = false;
  error: HttpErrorResponse;

  get submitBtnTooltip(): string {
    return this.userForm.get('terms').invalid ? 'Agree our Terms and Conditions and Privacy policy' : null;
  }

  constructor(
    private dialogRef: MatDialogRef<AuthSignUpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private fb: FormBuilder,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private apiUserService: ApiUserService,
    private apiBusinessService: ApiBusinessService,
    private store: Store<AuthState>
  ) {

  }

  ngOnInit(): void {
    this.form = this.getForm();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onSave() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    let signUpRequest: SignUpRequest = {
      ...this.form.value,
    };

    this.reCaptchaV3Service.execute(environment.LNR_API_RECAPTCHA_V3_PUBLIC, 'homepage', (token) => {
      signUpRequest = this.setReCaptchaToken(signUpRequest, token);
      signUpRequest = this.setIsShop(signUpRequest);

      this.signUp(signUpRequest);
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  toggleTab(tab: TabsEnum) {
    this.tab = tab;
  }

  get businessForm(): AbstractControl | null {
    return this.form.get('business');
  }

  get userForm(): AbstractControl | null {
    return this.form.get('user');
  }

  private signUp(signUpRequest: SignUpRequest) {
    this.error = null;
    this.apiUserService.create(signUpRequest)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        this.loading = false;
        if (this.tab === TabsEnum.BUSINESS) {
          this.createBusinessAccount(this.businessForm.value);
        }

        const credentials: OauthTokenRequest = {
          email: this.userForm.value.email,
          password: this.userForm.value.password,
          grant_type: OauthGrantTypeEnum.PASSWORD
        };
        this.store.dispatch(LoginWithCredentials({credentials}));

      }, (error => {
        this.loading = false;
        this.error = error;
      }));
  }

  private createBusinessAccount(businessCreateRequest: BusinessCreateRequest) {
    this.loading = true;
    this.apiBusinessService.create(businessCreateRequest)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        this.loading = false;
      }, (error) => {
        this.loading = false;
      });
  }

  private setReCaptchaToken(signUpRequest: SignUpRequest, token: string) {
    signUpRequest.recaptcha_token = token;
    return signUpRequest;
  }

  private setIsShop(signUpRequest: SignUpRequest) {
    signUpRequest.is_shop = this.tab === TabsEnum.BUSINESS;
    return signUpRequest;
  }

  private getForm() {
    const formControls = {
      business: this.fb.group(
        {
          company_name: ['test', Validators.required],
        }
      ),
      user: this.fb.group(
        {
          first_name: ['', Validators.required],
          last_name: ['', Validators.required],
          email: ['', [Validators.required]],
          password: ['', Validators.required],
          terms: [false, ValidatorsLnr.checkboxRequired],
          language: ['en']
        }
      ),
      notification_preference: this.fb.group(
        {
          newsletter: [false]
        }
      ),
      is_shop: [false],
      recaptcha_token: [null]
    };

    return this.fb.group({
      ...formControls
    });
  }

}
