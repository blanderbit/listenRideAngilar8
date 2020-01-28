import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthService, FacebookLoginProvider} from 'angularx-social-login';
import {ApiOauthService} from '@api/api-oauth/api-oauth.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'lnr-auth-login-facebook-button',
  templateUrl: './auth-login-facebook-button.component.html',
  styleUrls: ['../button.scss', './auth-login-facebook-button.component.scss']
})
export class AuthLoginFacebookButtonComponent implements OnDestroy {
  private destroyed$ = new Subject();
  @Input() text = 'Sign up with Facebook';
  @Input() disabled = false;
  loading = false;

  constructor(private apiOauthService: ApiOauthService) {

  }

  ngOnDestroy(): void {
    // this.destroyed$.next();
    // this.destroyed$.complete();
  }

  signInWithFB(): void {
    this.loading = true;
    this.apiOauthService.loginFacebook()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((user) => {
        debugger;
        this.loading = false;
      }, (error) => {
        debugger;
        this.loading = false;
      });
  }
}
