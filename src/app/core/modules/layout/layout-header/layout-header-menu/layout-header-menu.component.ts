import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import { select, Store } from '@ngrx/store';
import * as fromAuth from '@auth/store/reducers';
import { AuthActions } from '@auth/store/actions';

@Component({
  selector: 'lnr-menu',
  templateUrl: './layout-header-menu.component.html',
  styleUrls: ['./layout-header-menu.component.scss'],
})
export class LayoutHeaderMenuComponent {
  @Input() isLoggedIn = false;

  mobileQuery: MediaQueryList;

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;

  reason = '';

  user$ = this.storeAuth.pipe(select(fromAuth.selectUser));

  constructor(
    private storeAuth: Store<fromAuth.State>,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 990px)');
  }

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  login() {
    this.storeAuth.dispatch(AuthActions.openLoginDialog());
  }

  signUp() {
    this.storeAuth.dispatch(AuthActions.openSignUpDialog());
  }

  logOut() {
    this.storeAuth.dispatch(AuthActions.logout());
  }
}
