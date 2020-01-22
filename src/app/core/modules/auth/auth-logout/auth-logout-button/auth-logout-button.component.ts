import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
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
  isLoggedOut: boolean;

  constructor(private store: Store<OauthTokenResponse>) {
  }

  ngOnInit(): void {
    this.store
      .pipe(
        select(isLoggedOut)
      )
      .subscribe(value => this.isLoggedOut = value);
  }

  logOut() {
    this.store.dispatch(AuthActions.Logout());
  }

}
