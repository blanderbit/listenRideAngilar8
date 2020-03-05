import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidatorsLnr} from '@validators/validators-lnr';
import {SignUpRequest} from '@models/sign-up/sign-up-request';
import {ReCaptchaV3Service} from 'ngx-captcha';
import {environment} from '@environment/environment';
import {Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '../../store/reducers';
import {AuthActions, SignUpDialogActions} from '@core/modules/auth/store/actions';
import {takeUntil} from 'rxjs/operators';
import {SignUpFacebookRequest} from '@models/sign-up/sign-up-facebook-request';
import {ApiOauthService} from '@api/api-oauth/api-oauth.service';
import {NavigationEnd, Router} from '@angular/router';

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
    signUpPending$ = this.store.pipe(select(fromAuth.selectSignUpDialogPending));
    signUpError$ = this.store.pipe(select(fromAuth.selectSignUpDialogError));

    getSocialUserPending = false;

    signUpFacebookPending$ = this.store.pipe(select(fromAuth.selectSignUpFacebookPending));
    signUpFacebookError$ = this.store.pipe(select(fromAuth.selectSignUpFacebookError));
    signUpLoginFacebookPending$ = this.store.pipe(select(fromAuth.selectSignUpLoginFacebookPending));
    signUpLoginFacebookError$ = this.store.pipe(select(fromAuth.selectSignUpLoginFacebookError));

    signUpLoginPending$ = this.store.pipe(select(fromAuth.selectSignUpDialogLoginPending));
    signUpLoginError$ = this.store.pipe(select(fromAuth.selectSignUpDialogLoginError));

    signUpBusinessPending$ = this.store.pipe(select(fromAuth.selectSignUpBusinessCreatePending));
    signUpBusinessError$ = this.store.pipe(select(fromAuth.selectSignUpBusinessCreateError));

    get submitBtnTooltip(): string {
        return this.userForm.get('terms').invalid ? 'Agree our Terms and Conditions and Privacy policy' : null;
    }

    constructor(
        private fb: FormBuilder,
        private reCaptchaV3Service: ReCaptchaV3Service,
        private apiOauthService: ApiOauthService,
        private store: Store<fromAuth.State>,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.form = this.getForm();
        this.signUpPending$.pipe(takeUntil(this.destroyed$)).subscribe(pending => pending ? this.form.disable() : this.form.enable());
        this.signUpLoginPending$.pipe(takeUntil(this.destroyed$)).subscribe(pending => pending ? this.form.disable() : this.form.enable());
        this.signUpBusinessPending$.pipe(takeUntil(this.destroyed$)).subscribe(pending => pending ? this.form.disable() : this.form.enable());
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    onSave() {
        if ((this.showPrivate && this.userForm.invalid) || (this.showBusiness && (this.userForm.invalid || this.businessForm.invalid))) {
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

    signInWithFB(): void {
        this.getSocialUserPending = true;
        const signUpRequest: SignUpRequest = {
            ...this.form.value,
        };

        this.apiOauthService.loginFacebook()
            .pipe(takeUntil(this.destroyed$))
            .subscribe((user) => {
                if (user && user.authToken) {
                    this.getSocialUserPending = false;
                    const signUpFacebookRequest: SignUpFacebookRequest = {
                        user: {
                            facebook_access_token: user.authToken
                        },
                        is_shop: false,
                        notification_preference: signUpRequest.notification_preference
                    };
                    this.store.dispatch(SignUpDialogActions.signUpFacebook({signUpFacebookRequest}));
                }
            }, (error) => {
                this.getSocialUserPending = false;
            });
    }

    toggleTab(tab: TabType) {
        this.tabType = tab;
    }

    openLoginDialog() {
        this.store.dispatch(SignUpDialogActions.close());
        this.store.dispatch(AuthActions.openLoginDialog());
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
        signUpRequest.is_shop = this.tabType === 'business';
        return signUpRequest;
    }

}
