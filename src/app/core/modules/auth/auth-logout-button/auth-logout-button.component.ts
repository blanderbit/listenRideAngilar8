import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '@core/modules/auth/store/reducers';
import {AuthActions, LoginDialogActions} from '@core/modules/auth/store/actions';

@Component({
  selector: 'lnr-auth-logout-button',
  templateUrl: './auth-logout-button.component.html',
  styleUrls: ['../button.scss', './auth-logout-button.component.scss']
})
export class AuthLogoutButtonComponent implements OnInit {
  @Input() text = 'Log out';
  @Input() disabled = false;
  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<fromAuth.State>) {
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(fromAuth.isLoggedIn));
  }

  logOut() {
    this.store.dispatch(AuthActions.headerLogout());
  }

}
