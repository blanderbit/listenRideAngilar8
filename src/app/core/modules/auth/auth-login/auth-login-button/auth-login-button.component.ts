import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AuthActions} from '@core/modules/auth/store/actions';
import * as fromAuth from '../../store/reducers';

@Component({
  selector: 'lnr-auth-login-button',
  templateUrl: './auth-login-button.component.html',
  styleUrls: ['../../button.scss', './auth-login-button.component.scss']
})
export class AuthLoginButtonComponent implements OnInit {
  @Input() text = 'Login';
  @Input() disabled = false;
  isLoggedIn: boolean;

  constructor(private store: Store<fromAuth.State>) {
  }

  ngOnInit(): void {
    this.store.pipe(select(fromAuth.isLoggedIn))
      .subscribe(loginState => this.isLoggedIn = loginState);
    // this.store.dispatch(AuthActions.headerOpenLoginDialog());
  }

  openDialog(): void {
    this.store.dispatch(AuthActions.headerOpenLoginDialog());
  }

}
