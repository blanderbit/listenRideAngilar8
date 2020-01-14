import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {MatDialog} from '@angular/material';
import {takeUntil} from 'rxjs/operators';
import {DialogConfig} from '@core/configs/dialog/dialog.config';
import {AuthLoginDialogComponent} from '@core/modules/auth/auth-login/auth-login-dialog/auth-login-dialog.component';
import {select, Store} from '@ngrx/store';
import {User} from '@models/user/user';
import {OauthTokenResponse} from '@models/oauth/oauth-token-response';
import {AuthActions} from '@core/modules/auth/store/actions';
import {isLoggedIn, isLoggedOut} from '@core/modules/auth/store/auth.selectors';

@Component({
  selector: 'lnr-auth-logout-button',
  templateUrl: './auth-logout-button.component.html',
  styleUrls: ['../../shared/button.scss', './auth-logout-button.component.scss']
})
export class AuthLogoutButtonComponent implements OnInit {
  private destroyed$ = new Subject();
  @Input() text = 'Log out';
  @Input() disabled = false;
  isLoggedOut$: Observable<boolean>;

  constructor(private store: Store<OauthTokenResponse>) {
  }

  ngOnInit(): void {
    this.isLoggedOut$ = this.store
      .pipe(
        select(isLoggedOut)
      );
  }

  logOut() {
    this.store.dispatch(AuthActions.Logout());
  }

}
