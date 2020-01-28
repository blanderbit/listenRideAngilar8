import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidatorsLnr} from '@validators/validators-lnr';
import {SignUpRequest} from '@models/sign-up/sign-up-request';
import {ReCaptchaV3Service} from 'ngx-captcha';
import {environment} from '@environment/environment';
import {Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '../../store/reducers';
import {SignUpDialogActions} from '@core/modules/auth/store/actions';
import {takeUntil} from 'rxjs/operators';

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
  pending$ = this.store.pipe(select(fromAuth.selectSignUpDialogPending));
  error$ = this.store.pipe(select(fromAuth.selectSignUpDialogError));
  loginPending$ = this.store.pipe(select(fromAuth.selectSignUpDialogLoginPending));
  loginError$ = this.store.pipe(select(fromAuth.selectSignUpDialogLoginError));
  createBusinessPending$ = this.store.pipe(select(fromAuth.selectSignUpBusinessCreatePending));
  createBusinessError$ = this.store.pipe(select(fromAuth.selectSignUpBusinessCreateError));

  get submitBtnTooltip(): string {
    return this.userForm.get('terms').invalid ? 'Agree our Terms and Conditions and Privacy policy' : null;
  }

  constructor(
    private fb: FormBuilder,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private store: Store<fromAuth.State>
  ) {
  }

  ngOnInit(): void {
    this.form = this.getForm();
    this.pending$.pipe(takeUntil(this.destroyed$)).subscribe(pending => pending ? this.form.disable() : this.form.enable());
    this.loginPending$.pipe(takeUntil(this.destroyed$)).subscribe(pending => pending ? this.form.disable() : this.form.enable());
    this.createBusinessPending$.pipe(takeUntil(this.destroyed$)).subscribe(pending => pending ? this.form.disable() : this.form.enable());
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onSave() {
    if (this.form.invalid) {
      return;
    }

    let signUpRequest: SignUpRequest = {
      ...this.form.value,
    };

    this.reCaptchaV3Service.execute(environment.LNR_API_RECAPTCHA_V3_PUBLIC, 'homepage', (token) => {
      signUpRequest = this.setReCaptchaToken(signUpRequest, token);
      signUpRequest = this.setIsShop(signUpRequest);

      this.signUp(signUpRequest);
    });
  }

  close() {
    this.store.dispatch(SignUpDialogActions.close());
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

  private getForm() {
    const formControls = {
      business: this.fb.group(
        {
          company_name: ['testCompanyName', Validators.required],
        }
      ),
      user: this.fb.group(
        {
          first_name: ['test', Validators.required],
          last_name: ['test', Validators.required],
          email: ['vasiliy.test+1@gmail.com', [Validators.required]],
          password: ['Test@123', Validators.required],
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

  private signUp(signUpRequest: SignUpRequest) {
    this.store.dispatch(SignUpDialogActions.signUp({signUpRequest}));
  }

  private setReCaptchaToken(signUpRequest: SignUpRequest, token: string): SignUpRequest {
    signUpRequest.recaptcha_token = token;
    return signUpRequest;
  }

  private setIsShop(signUpRequest: SignUpRequest): SignUpRequest {
    signUpRequest.is_shop = this.tab === TabsEnum.BUSINESS;
    return signUpRequest;
  }

}
